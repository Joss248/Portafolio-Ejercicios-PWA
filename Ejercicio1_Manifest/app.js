const tareaInput = document.getElementById("tareaInput");
const agregarBtn = document.getElementById("agregarBtn");
const listaTareas = document.getElementById("listaTareas");

// Agregar una nueva tarea
function agregarTarea() {

    const textoTarea = tareaInput.value.trim();

    // Evitar tareas vacías
    if (textoTarea === "") {
        alert("Escribe una tarea");
        return;
    }

    // Crear elemento de la lista
    const tarea = document.createElement("li");

    tarea.innerHTML = `
        <span class="texto-tarea">${textoTarea}</span>
        <div class="acciones">
            <button class="completar">✓</button>
            <button class="eliminar">✕</button>
        </div>
    `;

    // Botón para completar
    const botonCompletar = tarea.querySelector(".completar");

    botonCompletar.addEventListener("click", function () {
        tarea.classList.toggle("completada");
    });

    // Botón para eliminar
    const botonEliminar = tarea.querySelector(".eliminar");

    botonEliminar.addEventListener("click", function () {
        tarea.remove();
    });

    // Agregar tarea a la lista
    listaTareas.appendChild(tarea);

    // Limpiar input
    tareaInput.value = "";

    // Regresar cursor al input
    tareaInput.focus();
}


// Evento del botón Agregar
agregarBtn.addEventListener("click", agregarTarea);


// Permitir agregar presionando Enter
tareaInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        agregarTarea();
    }

});