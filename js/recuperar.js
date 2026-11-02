// js/recuperar.js
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("form");
    const inputEmail = document.getElementById("usuario"); // O como se llame el input de tu HTML

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault(); // Frenamos la recarga

        const email = inputEmail.value.trim();

        // Validación básica
        if (email === "") {
            alert("Por favor, ingresá tu correo electrónico.");
            return;
        }

        // Simulamos el envío
        alert("Si el correo " + email + " está registrado, te enviaremos los pasos a seguir.");
        
        // Lo mandamos de vuelta al login
        window.location.href = "../index.html"; 
    });
});