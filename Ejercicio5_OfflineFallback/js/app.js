const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("active");
});

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("./sw.js")
            .then(registration => {
                console.log("Service Worker registrado correctamente.");
            })
            .catch(error => {
                console.error("Error al registrar el Service Worker:", error);
            });

    });

}

// ==========================================
// GESTIÓN DE TAREAS CON INDEXEDDB
// ==========================================

const taskInput = document.getElementById("taskInput");
const saveTaskButton = document.getElementById("saveTaskButton");
const taskList = document.getElementById("taskList");


// Mostrar todas las tareas
async function mostrarTareas() {

    const tareas = await obtenerTareas();

    taskList.innerHTML = "";

    if (tareas.length === 0) {
        taskList.innerHTML =
            "<p>No hay tareas almacenadas.</p>";

        return;
    }

    tareas.forEach((tarea) => {

        const elemento = document.createElement("div");

        elemento.classList.add("task-item");

        const nombre = document.createElement("span");
        nombre.textContent = tarea.nombre;

        const botonEliminar = document.createElement("button");

        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add("delete-button");

        botonEliminar.addEventListener("click", async () => {

            await eliminarTarea(tarea.id);

            await mostrarTareas();

        });

        elemento.appendChild(nombre);
        elemento.appendChild(botonEliminar);

        taskList.appendChild(elemento);

    });

}


// Guardar nueva tarea
saveTaskButton.addEventListener("click", async () => {

    const nombre = taskInput.value.trim();

    if (nombre === "") {
        alert("Escribe una tarea.");
        return;
    }

    const nuevaTarea = {
        nombre: nombre,
        fecha: new Date().toLocaleString()
    };

    await guardarTarea(nuevaTarea);

    taskInput.value = "";

    await mostrarTareas();

});


// Mostrar las tareas al cargar la aplicación
document.addEventListener("DOMContentLoaded", async () => {

    await abrirBaseDatos();

    await mostrarTareas();

});