// ==========================================
// EJERCICIO 3: NOTIFICACIONES LOCALES
// ==========================================

const estadoPermiso = document.getElementById("estadoPermiso");
const estado = document.getElementById("estado");

const btnPermiso = document.getElementById("btnPermiso");
const btnNotificar = document.getElementById("btnNotificar");

const titulo = document.getElementById("titulo");
const contenido = document.getElementById("contenido");

let registroSW = null;


// ==========================================
// REGISTRAR SERVICE WORKER
// ==========================================

async function registrarServiceWorker() {

    if (!("serviceWorker" in navigator)) {

        estado.textContent =
            "❌ Este navegador no admite Service Workers.";

        return;
    }

    try {

        registroSW = await navigator.serviceWorker.register("./sw.js");

        await navigator.serviceWorker.ready;

        estado.textContent =
            "✅ Service Worker registrado correctamente.";

        actualizarPermiso();

    } catch (error) {

        console.error(error);

        estado.textContent =
            "❌ Error al registrar el Service Worker.";
    }
}


// ==========================================
// CONSULTAR PERMISO
// ==========================================

function actualizarPermiso() {

    if (!("Notification" in window)) {

        estadoPermiso.textContent =
            "❌ El navegador no admite notificaciones.";

        btnPermiso.disabled = true;
        btnNotificar.disabled = true;

        return;
    }

    const permiso = Notification.permission;

    switch (permiso) {

        case "granted":

            estadoPermiso.textContent =
                "✅ Permiso concedido";

            btnPermiso.disabled = true;
            btnNotificar.disabled = !registroSW;

            break;

        case "denied":

            estadoPermiso.textContent =
                "❌ Permiso denegado";

            btnPermiso.disabled = true;
            btnNotificar.disabled = true;

            break;

        default:

            estadoPermiso.textContent =
                "⚠️ Permiso pendiente de autorización";

            btnPermiso.disabled = false;
            btnNotificar.disabled = true;
    }
}


// ==========================================
// SOLICITAR PERMISO
// ==========================================

async function solicitarPermiso() {

    if (!("Notification" in window)) {
        return;
    }

    try {

        const permiso = await Notification.requestPermission();

        actualizarPermiso();

        if (permiso === "granted") {

            estado.textContent =
                "✅ Ya puedes mostrar notificaciones.";

        } else {

            estado.textContent =
                "⚠️ No se autorizó el envío de notificaciones.";
        }

    } catch (error) {

        console.error(error);

        estado.textContent =
            "❌ Error al solicitar permiso.";
    }
}


// ==========================================
// MOSTRAR NOTIFICACIÓN
// ==========================================

async function mostrarNotificacion() {

    if (!registroSW || Notification.permission !== "granted") {

        estado.textContent =
            "⚠️ Necesitas autorizar las notificaciones.";

        return;
    }

    const textoTitulo = titulo.value.trim();
    const textoContenido = contenido.value.trim();

    if (!textoTitulo || !textoContenido) {

        estado.textContent =
            "⚠️ Completa el título y el mensaje.";

        return;
    }

    const opciones = {

        body: textoContenido,

        icon: "./icons/icon-192.png",

        badge: "./icons/icon-192.png",

        vibrate: [200, 100, 200],

        tag: "notificacion-taskgo",

        data: {
            url: "./index.html"
        }

    };

    try {

        await registroSW.showNotification(
            textoTitulo,
            opciones
        );

        estado.textContent =
            "✅ Notificación enviada correctamente.";

    } catch (error) {

        console.error(error);

        estado.textContent =
            "❌ No fue posible mostrar la notificación.";
    }
}


// ==========================================
// EVENTOS
// ==========================================

btnPermiso.addEventListener(
    "click",
    solicitarPermiso
);

btnNotificar.addEventListener(
    "click",
    mostrarNotificacion
);


// ==========================================
// INICIALIZACIÓN
// ==========================================

registrarServiceWorker();