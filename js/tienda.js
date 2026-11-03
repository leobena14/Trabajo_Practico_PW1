import { traerDeStorage, guardarUsuarioActivo } from './storage.js';
import { planes } from './planes.js';

document.addEventListener("DOMContentLoaded", () => {
    const usuarioActivo = traerDeStorage("usuarioActivo");
    if (!usuarioActivo) {
        window.location.href = "../index.html";
        return;
    }

    const main = document.querySelector("main");
    const textoPlanUsuario = document.getElementById("plan-usuario");
    const mensajeTienda = document.getElementById("mensaje-tienda");

    const dibujarPlanes = () => {
        // Si el usuario nunca compró nada, tiene el plan gratis
        const planActual = usuarioActivo.plan || "gratis";

              // Mostramos arriba cuál es su plan (el nombre en negrita)
        const datosPlanActual = planes.find(p => p.id === planActual);
        if (datosPlanActual) {
            textoPlanUsuario.innerHTML = `Tu plan actual: <strong>${datosPlanActual.nombre}</strong>`;
        } else {
            textoPlanUsuario.innerHTML = "Tu plan actual: <strong>Gratis</strong>";
        }

        // Borramos los planes dibujados antes (por si se vuelve a dibujar)
        main.querySelectorAll("section").forEach(seccion => seccion.remove());

        planes.forEach(plan => {
            let beneficiosHTML = "";
            plan.beneficios.forEach(beneficio => {
                beneficiosHTML += `<li>${beneficio}</li>`;
            });

            let botonHTML = "";
            if (planActual === plan.id) {
                // Es su plan: mostramos la opción de darse de baja
                botonHTML = `
                    <p class="plan-actual">✔ Es tu plan actual</p>
                    <button type="button" class="boton-baja">Darme de baja</button>
                    <div class="confirmar-baja" hidden>
                        <p>¿Seguro? Vas a pasar al plan Gratis y perderás los beneficios de este plan.</p>
                        <button type="button" class="boton-si-baja">Sí, darme de baja</button>
                        <button type="button" class="boton-no-baja">No, mantener plan</button>
                    </div>
                `;
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

            // Los botones de baja solo existen en el plan actual
            if (planActual === plan.id) {
                const botonBaja = section.querySelector(".boton-baja");
                const cajaConfirmar = section.querySelector(".confirmar-baja");
                const botonSi = section.querySelector(".boton-si-baja");
                const botonNo = section.querySelector(".boton-no-baja");

                // 1. Mostrar la confirmación
                botonBaja.addEventListener("click", () => {
                    cajaConfirmar.hidden = false;
                    botonBaja.hidden = true;
                });

                // 2. Se arrepintió: escondemos la confirmación
                botonNo.addEventListener("click", () => {
                    cajaConfirmar.hidden = true;
                    botonBaja.hidden = false;
                });

                // 3. Confirmó: pasa al plan gratis
                botonSi.addEventListener("click", () => {
                    usuarioActivo.plan = "gratis";
                    guardarUsuarioActivo(usuarioActivo);
                    mensajeTienda.textContent = `✔ Te diste de baja del ${plan.nombre}. Ahora tenés el plan Gratis.`;
                    dibujarPlanes();
                });
            }
        });
    };

    dibujarPlanes();
});