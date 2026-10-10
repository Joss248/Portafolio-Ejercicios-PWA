
// ==========================================
// EJERCICIO 5: MANEJO DEL ESTADO OFFLINE
// ==========================================

const CACHE_NAME = "app-shell-cache-v5";

// Recursos que estarán disponibles sin Internet
const STATIC_FILES = [
    "./",
    "./index.html",
    "./offline.html",
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

    console.log("SW: Instalando recursos...");

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log("SW: Recursos guardados correctamente");
                return self.skipWaiting();
            })
    );
});

// ==========================================
// ACTIVACIÓN DEL SERVICE WORKER
// ==========================================

self.addEventListener("activate", (event) => {

    console.log("SW: Activando Service Worker...");

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
// INTERCEPTOR DE PETICIONES FETCH
// ==========================================

self.addEventListener("fetch", (event) => {

    // Solo interceptamos solicitudes GET
    if (event.request.method !== "GET") {
        return;
    }

    const url = new URL(event.request.url);

    // Solo manejamos recursos de nuestro proyecto
    if (url.origin !== self.location.origin) {
        return;
    }

    event.respondWith(
        (async () => {

            // 1. Consultar primero la memoria caché
            const cachedResponse = await caches.match(event.request);

            if (cachedResponse) {
                console.log("SW: Recurso desde caché:", url.pathname);
                return cachedResponse;
            }

            // 2. Si no está en caché, consultar Internet
            try {

                console.log("SW: Consultando red:", url.pathname);

                const networkResponse = await fetch(event.request);

                // Guardar únicamente respuestas exitosas
                if (networkResponse.ok) {

                    const cache = await caches.open(CACHE_NAME);

                    await cache.put(
                        event.request,
                        networkResponse.clone()
                    );
                }

                // Si la página no existe, mostrar fallback
                if (
                    event.request.mode === "navigate" &&
                    networkResponse.status === 404
                ) {
                    const offlinePage = await caches.match("./offline.html");

                    if (offlinePage) {
                        return offlinePage;
                    }
                }

                return networkResponse;

            } catch (error) {

                // 3. Detectar fallo de conexión
                console.warn("SW: Falló la conexión:", url.pathname);

                // 4. Mostrar página personalizada para navegaciones
                if (event.request.mode === "navigate") {

                    const offlinePage = await caches.match("./offline.html");

                    if (offlinePage) {
                        console.log("SW: Mostrando página Offline");
                        return offlinePage;
                    }
                }

                // Otros recursos sin respuesta disponible
                return Response.error();
            }

        })()
    );
});
