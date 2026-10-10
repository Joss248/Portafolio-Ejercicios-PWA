// ==========================================
// EJERCICIO 4: CACHE API Y CACHE-FIRST
// ==========================================

const CACHE_NAME = "app-shell-cache-v4";

// Recursos estáticos del App Shell
const STATIC_FILES = [
    "./",
    "./index.html",
    "./css/styles.css",
    "./js/app.js",
    "./js/database.js",
    "./manifest.json",
    "./icons/TaskGo_192x192px.png",
    "./icons/TaskGo_512x512px.png"
];

// ==========================================
// INSTALACIÓN DEL SERVICE WORKER
// ==========================================

self.addEventListener("install", (event) => {

    console.log("SW: Iniciando instalación...");

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {

                console.log("SW: Guardando recursos estáticos");

                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log("SW: Recursos almacenados correctamente");
            })
    );

    self.skipWaiting();
});

// ==========================================
// ACTIVACIÓN Y LIMPIEZA DE CACHÉ
// ==========================================

self.addEventListener("activate", (event) => {

    console.log("SW: Activando...");

    event.waitUntil(
        (async () => {

            const cacheNames = await caches.keys();

            await Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );

            await self.clients.claim();

            console.log("SW: Activación completada");

        })()
    );
});

// ==========================================
// ESTRATEGIA CACHE-FIRST
// ==========================================

self.addEventListener("fetch", (event) => {

    if (event.request.method !== "GET") {
        return;
    }

    const url = new URL(event.request.url);

    // Interceptar únicamente recursos del proyecto
    if (url.origin !== self.location.origin) {
        return;
    }

    event.respondWith(
        (async () => {

            // 1. Buscar primero en caché
            const cachedResponse = await caches.match(
                event.request
            );

            if (cachedResponse) {

                console.log(
                    "SW: Recurso servido desde caché:",
                    url.pathname
                );

                return cachedResponse;
            }

            // 2. Si no existe, consultar la red
            console.log(
                "SW: Consultando la red:",
                url.pathname
            );

            const networkResponse = await fetch(
                event.request
            );

            // 3. Guardar nuevos recursos válidos
            if (networkResponse.ok) {

                const cache = await caches.open(CACHE_NAME);

                await cache.put(
                    event.request,
                    networkResponse.clone()
                );
            }

            return networkResponse;

        })()
    );
});