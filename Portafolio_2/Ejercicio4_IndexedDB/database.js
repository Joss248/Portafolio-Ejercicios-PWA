// ==========================================
// EJERCICIO 4: BASE DE DATOS INDEXEDDB
// ==========================================

const DB_NAME = "NotasPWA_DB";
const DB_VERSION = 1;
const STORE_NAME = "notas";

let db = null;

// ==========================================
// ABRIR BASE DE DATOS
// ==========================================

function abrirBaseDatos() {

    return new Promise((resolve, reject) => {

        const solicitud = indexedDB.open(
            DB_NAME,
            DB_VERSION
        );

        solicitud.onupgradeneeded = (event) => {

            const database = event.target.result;

            if (!database.objectStoreNames.contains(STORE_NAME)) {

                database.createObjectStore(
                    STORE_NAME,
                    {
                        keyPath: "id",
                        autoIncrement: true
                    }
                );

                console.log("Object Store creado correctamente.");
            }
        };

        solicitud.onsuccess = (event) => {

            db = event.target.result;

            console.log("IndexedDB abierta correctamente.");

            resolve(db);
        };

        solicitud.onerror = () => {

            reject(solicitud.error);
        };
    });
}

// ==========================================
// GUARDAR NOTA
// ==========================================

function guardarNota(nota) {

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction(
            STORE_NAME,
            "readwrite"
        );

        const store = transaccion.objectStore(STORE_NAME);

        const solicitud = store.add(nota);

        let idGenerado = null;

        solicitud.onsuccess = () => {
            idGenerado = solicitud.result;
        };

        transaccion.oncomplete = () => {
            resolve(idGenerado);
        };

        transaccion.onerror = () => {
            reject(transaccion.error);
        };

        transaccion.onabort = () => {
            reject(transaccion.error);
        };
    });
}

// ==========================================
// CONSULTAR NOTAS
// ==========================================

function obtenerNotas() {

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction(
            STORE_NAME,
            "readonly"
        );

        const store = transaccion.objectStore(STORE_NAME);

        const solicitud = store.getAll();

        solicitud.onsuccess = () => {
            resolve(solicitud.result);
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
}

// ==========================================
// ELIMINAR NOTA
// ==========================================

function eliminarNota(id) {

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction(
            STORE_NAME,
            "readwrite"
        );

        const store = transaccion.objectStore(STORE_NAME);

        store.delete(id);

        transaccion.oncomplete = () => {
            resolve();
        };

        transaccion.onerror = () => {
            reject(transaccion.error);
        };

        transaccion.onabort = () => {
            reject(transaccion.error);
        };
    });
}