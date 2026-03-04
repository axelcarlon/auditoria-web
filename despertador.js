// despertador.js - Levanta el servidor de Render silenciosamente
document.addEventListener("DOMContentLoaded", () => {
    fetch("https://fastapi-susu.onrender.com/ping", { method: "GET", mode: "no-cors" })
        .then(() => console.log("Motor IA activado."))
        .catch(() => console.log("Iniciando motor IA..."));
});
