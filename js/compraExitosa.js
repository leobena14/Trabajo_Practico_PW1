import { planes } from './planes.js';

document.addEventListener("DOMContentLoaded", () => {
    const parametros = new URLSearchParams(window.location.search);
    const plan = planes.find(p => p.id === parametros.get("plan"));

    if (plan) {
        document.getElementById("detalle-compra").textContent =
            `Ya activamos tu ${plan.nombre}. Podés empezar a usarlo cuando quieras.`;
    }
});