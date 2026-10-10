const CACHE_NAME = "app-shell-v2";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./css/styles.css",
    "./js/app.js",
    "./manifest.json"
];

self.addEventListener("install", (event) => {
    console.log("Service Worker: instalando...");

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log("Archivos guardados en caché");
                return cache.addAll(FILES_TO_CACHE);
            })
    );

    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    console.log("Service Worker: activado");

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );

    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});