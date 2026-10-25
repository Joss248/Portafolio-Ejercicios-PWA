// ==========================================
// EJERCICIO 3: SERVICE WORKER
// ==========================================

// INSTALACIÓN
self.addEventListener("install", (event) => {

    console.log("Service Worker instalado");

    self.skipWaiting();

});

// ACTIVACIÓN
self.addEventListener("activate", (event) => {

    console.log("Service Worker activado");

    event.waitUntil(self.clients.claim());

});

// CLIC EN NOTIFICACIÓN
self.addEventListener("notificationclick", (event) => {

    event.notification.close();

    event.waitUntil(
        self.clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then((clientes) => {

            if (clientes.length > 0) {
                return clientes[0].focus();
            }

            return self.clients.openWindow("./index.html");

        })
    );

});