// ==========================================
// EJERCICIO 5: INDEXEDDB
// ==========================================

const DB_NAME = "CacheDinamicaPWA_DB";
const DB_VERSION = 1;
const STORE_NAME = "respuestas";

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
                    { keyPath: "clave" }
                );
            }
        };

        solicitud.onsuccess = () => {

            db = solicitud.result;

            console.log("IndexedDB inicializada correctamente.");

            resolve(db);
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
}

// ==========================================
// GUARDAR RESPUESTA JSON
// ==========================================

function guardarRespuesta(clave, datos) {

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction(
            STORE_NAME,
            "readwrite"
        );

        const store = transaccion.objectStore(STORE_NAME);

        store.put({
            clave: clave,
            datos: datos,
            fecha: new Date().toISOString()
        });

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

// ==========================================
// RECUPERAR RESPUESTA JSON
// ==========================================

function obtenerRespuesta(clave) {

    return new Promise((resolve, reject) => {

        const transaccion = db.transaction(
            STORE_NAME,
            "readonly"
        );

        const store = transaccion.objectStore(STORE_NAME);

        const solicitud = store.get(clave);

        solicitud.onsuccess = () => {
            resolve(solicitud.result || null);
        };

        solicitud.onerror = () => {
            reject(solicitud.error);
        };
    });
}