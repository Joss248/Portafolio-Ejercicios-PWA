// ==========================================
// EJERCICIO 4: GESTIÓN DE NOTAS
// ==========================================

const titulo = document.getElementById("titulo");
const contenido = document.getElementById("contenido");

const btnGuardar = document.getElementById("btnGuardar");

const listaNotas = document.getElementById("listaNotas");
const estado = document.getElementById("estado");

// ==========================================
// MOSTRAR NOTAS
// ==========================================

async function mostrarNotas() {

    try {

        const notas = await obtenerNotas();

        listaNotas.innerHTML = "";

        if (notas.length === 0) {

            listaNotas.textContent =
                "Todavía no existen notas almacenadas.";

            return;
        }

        notas.forEach(nota => {

            const elemento = document.createElement("div");
            elemento.className = "nota";

            const encabezado = document.createElement("h3");
            encabezado.textContent = nota.titulo;

            const texto = document.createElement("p");
            texto.textContent = nota.contenido;

            const fecha = document.createElement("small");
            fecha.textContent = nota.fecha;

            const botonEliminar = document.createElement("button");
            botonEliminar.className = "btnEliminar";
            botonEliminar.textContent = "Eliminar";

            botonEliminar.addEventListener("click", async () => {

                try {

                    await eliminarNota(nota.id);

                    await mostrarNotas();

                    estado.textContent =
                        "✅ Nota eliminada correctamente.";

                } catch (error) {

                    console.error(error);

                    estado.textContent =
                        "❌ Error al eliminar la nota.";
                }
            });

            elemento.appendChild(encabezado);
            elemento.appendChild(texto);
            elemento.appendChild(fecha);
            elemento.appendChild(document.createElement("br"));
            elemento.appendChild(document.createElement("br"));
            elemento.appendChild(botonEliminar);

            listaNotas.appendChild(elemento);
        });

    } catch (error) {

        console.error(error);

        estado.textContent =
            "❌ Error al consultar las notas.";
    }
}

// ==========================================
// GUARDAR NOTA
// ==========================================

async function agregarNota() {

    const textoTitulo = titulo.value.trim();
    const textoContenido = contenido.value.trim();

    if (!textoTitulo || !textoContenido) {

        estado.textContent =
            "⚠️ Completa el título y el contenido.";

        return;
    }

    btnGuardar.disabled = true;

    try {

        const nuevaNota = {
            titulo: textoTitulo,
            contenido: textoContenido,
            fecha: new Date().toLocaleString()
        };

        await guardarNota(nuevaNota);

        titulo.value = "";
        contenido.value = "";

        await mostrarNotas();

        estado.textContent =
            "✅ Nota guardada correctamente.";

    } catch (error) {

        console.error(error);

        estado.textContent =
            "❌ Error al guardar la nota.";

    } finally {

        btnGuardar.disabled = false;
    }
}

// ==========================================
// INICIALIZAR APLICACIÓN
// ==========================================

async function inicializarAplicacion() {

    btnGuardar.disabled = true;

    try {

        await abrirBaseDatos();

        await mostrarNotas();

        btnGuardar.disabled = false;

        estado.textContent =
            "✅ Base de datos inicializada correctamente.";

    } catch (error) {

        console.error(error);

        estado.textContent =
            "❌ No fue posible inicializar IndexedDB.";
    }
}

// ==========================================
// EVENTOS
// ==========================================

btnGuardar.addEventListener("click", agregarNota);

inicializarAplicacion();

// ==========================================
// REGISTRAR SERVICE WORKER
// ==========================================

if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("./sw.js")
        .then(() => {
            console.log("Service Worker registrado.");
        })
        .catch(error => {
            console.error("Error en Service Worker:", error);
        });
}