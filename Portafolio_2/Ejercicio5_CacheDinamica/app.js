// ==========================================
// EJERCICIO 5: NETWORK-FIRST
// ==========================================

// API REST
const API_URL =
    "https://jsonplaceholder.typicode.com/posts?_limit=10";

const CACHE_KEY = "publicaciones";

// ELEMENTOS HTML
const estado = document.getElementById("estado");

const ultimaActualizacion = document.getElementById(
    "ultimaActualizacion"
);

const listaPublicaciones = document.getElementById(
    "listaPublicaciones"
);

const btnActualizar = document.getElementById(
    "btnActualizar"
);


// ==========================================
// MOSTRAR PUBLICACIONES
// ==========================================

function mostrarPublicaciones(publicaciones) {

    listaPublicaciones.innerHTML = "";

    if (publicaciones.length === 0) {

        listaPublicaciones.textContent =
            "No existen publicaciones disponibles.";

        return;
    }

    publicaciones.forEach(publicacion => {

        const elemento = document.createElement("div");
        elemento.className = "publicacion";

        const titulo = document.createElement("h3");
        titulo.textContent = publicacion.title;

        const contenido = document.createElement("p");
        contenido.textContent = publicacion.body;

        elemento.appendChild(titulo);
        elemento.appendChild(contenido);

        listaPublicaciones.appendChild(elemento);
    });
}


// ==========================================
// CONSULTAR API CON NETWORK-FIRST
// ==========================================

async function cargarPublicaciones() {

    btnActualizar.disabled = true;

    estado.textContent =
        "🌐 Consultando información en Internet...";

    try {

        // Intentar obtener información desde la red
        const respuesta = await fetch(API_URL, {
            cache: "no-store",
            signal: AbortSignal.timeout(8000)
        });

        if (!respuesta.ok) {

            throw new Error(
                `Error HTTP: ${respuesta.status}`
            );
        }

        const publicaciones = await respuesta.json();

        if (!Array.isArray(publicaciones)) {
            throw new Error("Formato JSON inesperado.");
        }

        // Guardar la última respuesta en IndexedDB
        await guardarRespuesta(
            CACHE_KEY,
            publicaciones
        );

        // Mostrar información actualizada
        mostrarPublicaciones(publicaciones);

        estado.textContent =
            "✅ Información obtenida desde Internet.";

        ultimaActualizacion.textContent =
            "Última actualización: " +
            new Date().toLocaleString();

        console.log(
            "NETWORK-FIRST: Datos obtenidos desde la API."
        );

    } catch (error) {

        console.warn(
            "La red no está disponible o falló la solicitud:",
            error
        );

        estado.textContent =
            "⚠️ No se pudo consultar Internet. Buscando datos locales...";

        try {

            // Recuperar último JSON almacenado
            const datosGuardados = await obtenerRespuesta(
                CACHE_KEY
            );

            if (datosGuardados) {

                mostrarPublicaciones(
                    datosGuardados.datos
                );

                estado.textContent =
                    "📦 Modo Offline: mostrando datos almacenados.";

                ultimaActualizacion.textContent =
                    "Última actualización: " +
                    new Date(
                        datosGuardados.fecha
                    ).toLocaleString();

                console.log(
                    "NETWORK-FIRST: Datos recuperados desde IndexedDB."
                );

            } else {

                listaPublicaciones.textContent =
                    "No existen datos almacenados.";

                estado.textContent =
                    "❌ Sin conexión y sin información local disponible.";

                ultimaActualizacion.textContent =
                    "Última actualización: --";
            }

        } catch (errorDB) {

            console.error(
                "Error al recuperar IndexedDB:",
                errorDB
            );

            estado.textContent =
                "❌ No fue posible recuperar la información local.";
        }

    } finally {

        btnActualizar.disabled = false;
    }
}


// ==========================================
// INICIALIZAR APLICACIÓN
// ==========================================

async function inicializarAplicacion() {

    btnActualizar.disabled = true;

    try {

        await abrirBaseDatos();

        await cargarPublicaciones();

    } catch (error) {

        console.error(error);

        estado.textContent =
            "❌ Error al inicializar la base de datos.";

        btnActualizar.disabled = false;
    }
}


// ==========================================
// EVENTOS
// ==========================================

btnActualizar.addEventListener(
    "click",
    cargarPublicaciones
);

inicializarAplicacion();