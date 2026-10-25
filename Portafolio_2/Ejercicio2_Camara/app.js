// ==========================================
// EJERCICIO 2: CÁMARA WEB Y CAPTURA
// ==========================================

// ELEMENTOS HTML

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");

const btnIniciar = document.getElementById("btnIniciar");
const btnCapturar = document.getElementById("btnCapturar");
const btnDetener = document.getElementById("btnDetener");
const btnDescargar = document.getElementById("btnDescargar");

const estado = document.getElementById("estado");
const mensajeFoto = document.getElementById("mensajeFoto");

// VARIABLES

let stream = null;
let iniciando = false;

const contexto = canvas.getContext("2d");


// ==========================================
// ACTIVAR CÁMARA
// ==========================================

async function iniciarCamara() {

    if (stream || iniciando) {
        return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {

        estado.textContent =
            "❌ Este navegador no admite acceso a la cámara.";

        return;
    }

    iniciando = true;
    btnIniciar.disabled = true;

    estado.textContent =
        "Solicitando acceso a la cámara...";

    try {

        stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });

        video.srcObject = stream;

        await video.play();

        estado.textContent =
            "✅ Cámara activada correctamente.";

        btnCapturar.disabled = false;
        btnDetener.disabled = false;

    } catch (error) {

        console.error("Error al activar cámara:", error);

        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }

        video.srcObject = null;

        if (error.name === "NotAllowedError") {

            estado.textContent =
                "❌ Permiso de cámara denegado.";

        } else if (error.name === "NotFoundError") {

            estado.textContent =
                "❌ No se encontró una cámara disponible.";

        } else if (error.name === "NotReadableError") {

            estado.textContent =
                "❌ La cámara está siendo utilizada por otra aplicación.";

        } else {

            estado.textContent =
                "❌ No fue posible activar la cámara.";
        }

        btnIniciar.disabled = false;

    } finally {
        iniciando = false;
    }
}


// ==========================================
// CAPTURAR FOTOGRAFÍA
// ==========================================

function capturarFoto() {

    if (!stream || video.readyState < 2) {

        estado.textContent =
            "⚠️ La cámara todavía no está lista.";

        return;
    }

    // Obtener dimensiones reales del video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Dibujar el fotograma actual
    contexto.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );

    mensajeFoto.textContent =
        "✅ Fotografía capturada correctamente.";

    btnDescargar.disabled = false;
}


// ==========================================
// DETENER CÁMARA
// ==========================================

function detenerCamara() {

    if (stream) {

        // Liberar recursos de la cámara
        stream.getTracks().forEach(track => {
            track.stop();
        });

        stream = null;
    }

    video.pause();
    video.srcObject = null;

    btnIniciar.disabled = false;
    btnCapturar.disabled = true;
    btnDetener.disabled = true;

    estado.textContent =
        "Cámara desactivada correctamente.";
}


// ==========================================
// DESCARGAR FOTOGRAFÍA
// ==========================================

function descargarFoto() {

    if (btnDescargar.disabled) {
        return;
    }

    const enlace = document.createElement("a");

    enlace.download = "fotografia-pwa.png";
    enlace.href = canvas.toDataURL("image/png");

    enlace.click();
}


// ==========================================
// EVENTOS
// ==========================================

btnIniciar.addEventListener("click", iniciarCamara);

btnCapturar.addEventListener("click", capturarFoto);

btnDetener.addEventListener("click", detenerCamara);

btnDescargar.addEventListener("click", descargarFoto);


// Detener cámara al cerrar o recargar la página
window.addEventListener("pagehide", detenerCamara);