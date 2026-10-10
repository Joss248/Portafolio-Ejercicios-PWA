console.log("DATABASE.JS SE ESTÁ EJECUTANDO");

const DB_NAME = "AppShellDB";
const DB_VERSION = 1;
const STORE_NAME = "tareas";

let db;


// ==========================================
// ABRIR / CREAR BASE DE DATOS
// ==========================================

function abrirBaseDatos() {

    console.log("Intentando abrir IndexedDB...");

    return new Promise((resolve, reject) => {

        const request = indexedDB.open(DB_NAME, DB_VERSION);


        // Se ejecuta cuando la base se crea por primera vez
        request.onupgradeneeded = (event) => {

            console.log("Creando estructura de IndexedDB...");

            db = event.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {

                db.createObjectStore(STORE_NAME, {
                    keyPath: "id",
                    autoIncrement: true
                });

                console.log("Object Store 'tareas' creado.");
            }

        };


        // Base abierta correctamente
        request.onsuccess = (event) => {

            db = event.target.result;

            console.log("IndexedDB abierta correctamente.");
            console.log("Object Stores:", [...db.objectStoreNames]);

            resolve(db);

        };


        // Error
        request.onerror = (event) => {

            console.error(
                "Error al abrir IndexedDB:",
                event.target.error
            );

            reject(event.target.error);

        };

    });

}


// ==========================================
// GUARDAR TAREA
// ==========================================

async function guardarTarea(tarea) {

    if (!db) {
        await abrirBaseDatos();
    }

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(
            STORE_NAME,
            "readwrite"
        );

        const store = transaction.objectStore(STORE_NAME);

        const request = store.add(tarea);

        request.onsuccess = () => {
            console.log("Tarea guardada correctamente.");
            resolve(request.result);
        };

        request.onerror = () => {
            console.error("Error al guardar tarea.");
            reject(request.error);
        };

    });

}


// ==========================================
// OBTENER TAREAS
// ==========================================

async function obtenerTareas() {

    if (!db) {
        await abrirBaseDatos();
    }

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(
            STORE_NAME,
            "readonly"
        );

        const store = transaction.objectStore(STORE_NAME);

        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };

    });

}


// ==========================================
// ELIMINAR TAREA
// ==========================================

async function eliminarTarea(id) {

    if (!db) {
        await abrirBaseDatos();
    }

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(
            STORE_NAME,
            "readwrite"
        );

        const store = transaction.objectStore(STORE_NAME);

        const request = store.delete(id);

        request.onsuccess = () => {
            console.log("Tarea eliminada.");
            resolve();
        };

        request.onerror = () => {
            reject(request.error);
        };

    });

}


// ==========================================
// INICIALIZAR INDEXEDDB
// ==========================================

abrirBaseDatos()
    .then(() => {
        console.log("Inicialización de IndexedDB terminada.");
    })
    .catch((error) => {
        console.error("No se pudo inicializar IndexedDB:", error);
    });