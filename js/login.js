// js/login.js
import { guardarEnStorage, traerDeStorage } from './storage.js';

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("form");
    const inputUsuario = document.getElementById("usuario");
    const inputContrasena = document.getElementById("contrasena");

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const usuario = inputUsuario.value.trim();
        const contrasena = inputContrasena.value.trim();

        // 1. Validar que no estén vacíos
        if (usuario === "" || contrasena === "") {
            alert("Por favor, completá todos los campos para iniciar sesión.");
            return;
        }

        // 2. Traer la lista de usuarios registrados (si no hay, es un array vacío)
        const usuariosRegistrados = traerDeStorage("usuariosRegistrados") || [];

        // 3. Buscar si el usuario y la contraseña coinciden
        const usuarioValido = usuariosRegistrados.find(u => 
            (u.usuario === usuario || u.email === usuario) && u.contrasena === contrasena
        );

        // 4. Si no lo encuentra, mostramos error
        if (!usuarioValido) {
            alert("Usuario o contraseña incorrectos. Por favor, verificá los datos.");
            return;
        }

        // 5. Si existe, lo guardamos como activo y redirigimos
        guardarEnStorage("usuarioActivo", usuarioValido);
        window.location.href = "dashboard/dashboard-principal.html";
    });
});