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