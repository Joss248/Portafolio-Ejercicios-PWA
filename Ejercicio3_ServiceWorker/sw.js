// ==========================================
// CONFIGURACIÓN
// ==========================================

const STATIC_CACHE = "static-cache-v1";
const DYNAMIC_CACHE = "dynamic-cache-v1";

const STATIC_FILES = [
    "./",
    "./index.html",
    "./css/styles.css",
    "./js/app.js",
    "./js/database.js",
    "./manifest.json"
];


// ==========================================
// INSTALACIÓN
// ==========================================

self.addEventListener("install", (event) => {

    console.log("Service Worker: instalando...");

    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log("Guardando recursos estáticos...");
                return cache.addAll(STATIC_FILES);
            })
    );

    self.skipWaiting();
});


// ==========================================
// ACTIVACIÓN
// ==========================================

self.addEventListener("activate", (event) => {

    console.log("Service Worker: activando...");

    const cachesPermitidas = [
        STATIC_CACHE,
        DYNAMIC_CACHE
    ];

    event.waitUntil(

        caches.keys().then((cacheNames) => {

            return Promise.all(

                cacheNames.map((cacheName) => {

                    if (!cachesPermitidas.includes(cacheName)) {

                        console.log(
                            "Eliminando caché antigua:",
                            cacheName
                        );

                        return caches.delete(cacheName);
                    }

                })

            );

        })

    );

    self.clients.claim();
});


// ==========================================
// FETCH
// ==========================================

self.addEventListener("fetch", (event) => {

    // Solo procesar peticiones GET
    if (event.request.method !== "GET") {
        return;
    }

    const requestURL = new URL(event.request.url);


    // ------------------------------------------
    // RECURSOS ESTÁTICOS: CACHE FIRST
    // ------------------------------------------

    if (requestURL.origin === location.origin) {

        event.respondWith(

            caches.match(event.request)
                .then((cachedResponse) => {

                    if (cachedResponse) {

                        console.log(
                            "Recurso obtenido desde caché:",
                            event.request.url
                        );

                        return cachedResponse;
                    }


                    return fetch(event.request)
                        .then((networkResponse) => {

                            return caches.open(DYNAMIC_CACHE)
                                .then((cache) => {

                                    cache.put(
                                        event.request,
                                        networkResponse.clone()
                                    );

                                    return networkResponse;

                                });

                        });

                })

        );

        return;
    }


    // ------------------------------------------
    // RECURSOS EXTERNOS/DINÁMICOS:
    // NETWORK FIRST
    // ------------------------------------------

    event.respondWith(

        fetch(event.request)

            .then((networkResponse) => {

                return caches.open(DYNAMIC_CACHE)
                    .then((cache) => {

                        cache.put(
                            event.request,
                            networkResponse.clone()
                        );

                        return networkResponse;

                    });

            })

            .catch(() => {

                return caches.match(event.request);

            })

    );

});