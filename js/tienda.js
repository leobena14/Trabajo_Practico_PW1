import { traerDeStorage } from './storage.js';
import { planes } from './planes.js';

document.addEventListener("DOMContentLoaded", () => {
    const usuarioActivo = traerDeStorage("usuarioActivo");
    if (!usuarioActivo) {
        window.location.href = "../index.html";
        return;
    }

    // Si el usuario nunca compró nada, no tiene plan
    const planActual = usuarioActivo.plan || "gratis";
    const main = document.querySelector("main");

    planes.forEach(plan => {
        // Armamos la lista de beneficios
        let beneficiosHTML = "";
        plan.beneficios.forEach(beneficio => {
            beneficiosHTML += `<li>${beneficio}</li>`;
        });

        // Si ya tiene este plan, no mostramos el botón de comprar
        let botonHTML = "";
        if (planActual === plan.id) {
            botonHTML = `<p class="plan-actual">✔ Es tu plan actual</p>`;
        } else {
            botonHTML = `<a href="../compra/tarjeta.html?plan=${plan.id}" class="boton-comprar">COMPRAR</a>`;
        }

        const section = document.createElement("section");
        section.className = plan.clase;
        section.innerHTML = `
            <h2>${plan.nombre}</h2>
            <p>ARS ${plan.precio}/mes</p>
            <ul class="beneficios">${beneficiosHTML}</ul>
            ${botonHTML}
        `;
        main.appendChild(section);
    });
});