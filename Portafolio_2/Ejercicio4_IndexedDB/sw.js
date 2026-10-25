// ==========================================
// SERVICE WORKER - EJERCICIO 4
// ==========================================

const CACHE_NAME = "notas-pwa-cache-v2";

const ARCHIVOS = [
    "./",
    "./index.html",
    "./styles.css",
    "./database.js",
    "./app.js"
];

// INSTALACIÓN

self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ARCHIVOS))
            .then(() => self.skipWaiting())
    );
});

// ACTIVACIÓN

self.addEventListener("activate", event => {

    event.waitUntil(
        (async () => {

            const nombres = await caches.keys();

            await Promise.all(
                nombres
                    .filter(nombre => nombre.startsWith("notas-pwa-cache-") &&
                        nombre !== CACHE_NAME)
                    .map(nombre => caches.delete(nombre))
            );

            await self.clients.claim();

        })()
    );
});

// CACHE-FIRST

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") {
        return;
    }

    const url = new URL(event.request.url);

    if (url.origin !== self.location.origin) {
        return;
    }

    // Evitar interceptar recursos de otros ejercicios
    if (!url.pathname.startsWith(
        new URL(self.registration.scope).pathname
    )) {
        return;
    }

    event.respondWith(
        (async () => {

            const cache = await caches.open(CACHE_NAME);

            const respuestaGuardada = await cache.match(event.request);

            if (respuestaGuardada) {
                return respuestaGuardada;
            }

            const respuestaRed = await fetch(event.request);

            if (respuestaRed.ok) {

                await cache.put(
                    event.request,
                    respuestaRed.clone()
                );
            }

            return respuestaRed;

        })()
    );
});