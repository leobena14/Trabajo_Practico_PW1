import { traerDeStorage, guardarUsuarioActivo } from './storage.js';
import { planes } from './planes.js';

document.addEventListener("DOMContentLoaded", () => {
    const usuarioActivo = traerDeStorage("usuarioActivo");
    if (!usuarioActivo) {
        window.location.href = "../index.html";
        return;
    }

    const formulario = document.querySelector("form");
    const tituloPlan = document.getElementById("titulo-plan");
    const mensaje = document.getElementById("mensaje");
    const botonComprar = document.getElementById("boton-comprar");

    // Leemos qué plan viene en la URL (?plan=basico)
    const parametros = new URLSearchParams(window.location.search);
    const idPlan = parametros.get("plan");
    const plan = planes.find(p => p.id === idPlan);


    tituloPlan.textContent = `Estás comprando: ${plan.nombre}`;
    botonComprar.textContent = `Comprar — ARS ${plan.precio}`;

    const mostrarError = (texto) => {
        mensaje.textContent = "⚠ Error: " + texto;
    };

    // ---- Filtros mientras se escribe ----
    const inputNombre = document.getElementById("name");
    const inputNumero = document.getElementById("cardNumber");
    const inputVencimiento = document.getElementById("expiry");
    const inputCvv = document.getElementById("cvv");

    // Nombre: solo letras (con tildes y ñ) y espacios
    inputNombre.addEventListener("input", () => {
        inputNombre.value = inputNombre.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ ]/g, "");
    });

    // Número de tarjeta: solo números, máximo 16, separados de a 4
    inputNumero.addEventListener("input", () => {
        const soloNumeros = inputNumero.value.replace(/[^0-9]/g, "").slice(0, 16);

        let conEspacios = "";
        for (let i = 0; i < soloNumeros.length; i++) {
            if (i > 0 && i % 4 === 0) {
                conEspacios += " ";
            }
            conEspacios += soloNumeros[i];
        }
        inputNumero.value = conEspacios;
    });

    // Vencimiento: solo números, y la "/" se pone sola después del mes
    inputVencimiento.addEventListener("input", () => {
        const soloNumeros = inputVencimiento.value.replace(/[^0-9]/g, "").slice(0, 4);

        if (soloNumeros.length > 2) {
            inputVencimiento.value = soloNumeros.slice(0, 2) + "/" + soloNumeros.slice(2);
        } else {
            inputVencimiento.value = soloNumeros;
        }
    });

    // CVV: solo números
    inputCvv.addEventListener("input", () => {
        inputCvv.value = inputCvv.value.replace(/[^0-9]/g, "");
    });

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nombre = document.getElementById("name").value.trim();
        const numero = document.getElementById("cardNumber").value.replaceAll(" ", "");
        const vencimiento = document.getElementById("expiry").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        // 1. Campos vacíos
        if (nombre === "" || numero === "" || vencimiento === "" || cvv === "") {
            mostrarError("completá todos los campos.");
            return;
        }

        // 2. Número de tarjeta: 16 números
        if (numero.length !== 16 || isNaN(numero)) {
            mostrarError("el número de tarjeta debe tener 16 dígitos.");
            return;
        }

        // 3. Vencimiento con formato MM/AA
        const partes = vencimiento.split("/");
        const mes = Number(partes[0]);
        const anio = Number(partes[1]);
        if (partes.length !== 2 || partes[0].length !== 2 || partes[1].length !== 2 ||
            isNaN(mes) || isNaN(anio) || mes < 1 || mes > 12) {
            mostrarError("el vencimiento debe tener el formato MM/AA (por ejemplo 08/28).");
            return;
        }

        // 4. Que la tarjeta no esté vencida
        const hoy = new Date();
        const anioActual = hoy.getFullYear() % 100; // 2026 -> 26
        const mesActual = hoy.getMonth() + 1;       // enero es 0
        if (anio < anioActual || (anio === anioActual && mes < mesActual)) {
            mostrarError("la tarjeta está vencida.");
            return;
        }

        // 5. CVV: 3 o 4 números
        if ((cvv.length !== 3) || isNaN(cvv)) {
            mostrarError("el CVV debe tener 3 números.");
            return;
        }

        usuarioActivo.plan = plan.id;
        guardarUsuarioActivo(usuarioActivo);

        window.location.href = `compraExitosa.html?plan=${plan.id}`;
    });
});