// ==========================================
// EJERCICIO 1: PERMISOS Y GEOLOCALIZACIÓN
// ==========================================

// ELEMENTOS HTML

const estadoPermiso = document.getElementById("estadoPermiso");

const latitud = document.getElementById("latitud");
const longitud = document.getElementById("longitud");
const precision = document.getElementById("precision");

const mensaje = document.getElementById("mensaje");

const btnPermiso = document.getElementById("btnPermiso");
const btnUbicacion = document.getElementById("btnUbicacion");


// ==========================================
// CONSULTAR PERMISOS
// ==========================================

async function consultarPermiso() {

    if (!navigator.permissions) {
        estadoPermiso.textContent =
            "La Permissions API no está disponible.";

        return;
    }

    try {

        const permiso = await navigator.permissions.query({
            name: "geolocation"
        });

        actualizarEstadoPermiso(permiso.state);

        // Detectar cambios en el permiso
        permiso.onchange = () => {
            actualizarEstadoPermiso(permiso.state);
        };

    } catch (error) {

        estadoPermiso.textContent =
            "No fue posible consultar el permiso.";

        console.error(error);
    }
}


// ==========================================
// ACTUALIZAR ESTADO DEL PERMISO
// ==========================================

function actualizarEstadoPermiso(estado) {

    switch (estado) {

        case "granted":

            estadoPermiso.textContent =
                "✅ Permiso concedido";

            break;

        case "denied":

            estadoPermiso.textContent =
                "❌ Permiso denegado";

            break;

        case "prompt":

            estadoPermiso.textContent =
                "⚠️ Permiso pendiente de autorización";

            break;

        default:

            estadoPermiso.textContent =
                "Estado desconocido";
    }
}


// ==========================================
// OBTENER GEOLOCALIZACIÓN
// ==========================================

function obtenerUbicacion() {

    if (!navigator.geolocation) {

        mensaje.textContent =
            "Este navegador no admite geolocalización.";

        return;
    }

    btnUbicacion.disabled = true;

    mensaje.textContent =
        "Obteniendo ubicación, espera un momento...";

    navigator.geolocation.getCurrentPosition(

        // UBICACIÓN OBTENIDA
        (posicion) => {

            const coordenadas = posicion.coords;

            latitud.textContent =
                coordenadas.latitude.toFixed(6);

            longitud.textContent =
                coordenadas.longitude.toFixed(6);

            precision.textContent =
                `${coordenadas.accuracy.toFixed(2)} metros`;

            mensaje.textContent =
                "✅ Ubicación obtenida correctamente.";

            btnUbicacion.disabled = false;

            consultarPermiso();
        },

        // ERROR DE GEOLOCALIZACIÓN
        (error) => {

            switch (error.code) {

                case 1:
                    mensaje.textContent =
                        "❌ Permiso de ubicación denegado.";
                    break;

                case 2:
                    mensaje.textContent =
                        "❌ No se pudo determinar la ubicación.";
                    break;

                case 3:
                    mensaje.textContent =
                        "❌ Se agotó el tiempo de espera.";
                    break;

                default:
                    mensaje.textContent =
                        "❌ Ocurrió un error desconocido.";
            }

            btnUbicacion.disabled = false;

            consultarPermiso();
        },

        // OPCIONES DE GEOLOCALIZACIÓN
        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }
    );
}


// ==========================================
// EVENTOS DE LOS BOTONES
// ==========================================

btnPermiso.addEventListener(
    "click",
    consultarPermiso
);

btnUbicacion.addEventListener(
    "click",
    obtenerUbicacion
);


// ==========================================
// CONSULTA INICIAL
// ==========================================

consultarPermiso();