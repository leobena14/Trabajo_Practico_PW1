import { traerDeStorage, guardarUsuarioActivo } from './storage.js';
import { planes } from './planes.js';

// Lista de palabras no permitidas
const palabrasProhibidas = [
    "boludo", "boluda", "pelotudo", "pelotuda", "forro", "forra",
    "pajero", "pajera", "sorrete", "cagon", "cagona", "gorreado", "gorreada", "malparido", "malparida",
    "concha", "conchuda", "conchudo", "pija", "chota", "orto", "puto", "puta", "trolo", "trola",
    "hdp", "hijodeputa", "hdmp", "hijodemilputa", "gil", "gilastrun", "culiao", "culia",
    "culiado", "culiada", "culiando", "culiandome", "culiandonos", "judio", "judia", "judios", "judias",
    "negro", "negra", "negros", "negras", "gay"];

// Función para verificar si algún texto contiene términos de la lista
function contieneOfensas(...textos) {
    return textos.some(texto => {
        const textoMinusculas = texto.toLowerCase();
        return palabrasProhibidas.some(palabra => 
            textoMinusculas.includes(palabra.toLowerCase())
        );
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const usuarioActivo = traerDeStorage("usuarioActivo");
    if (!usuarioActivo) {
        window.location.href = "../index.html";
        return;
    }

    const mensajePerfil = document.getElementById("mensaje-perfil");

    // ---------- 1. Mostrar los datos del usuario ----------
    const mostrarDatos = () => {
        document.getElementById("perfil-nombre").textContent = usuarioActivo.nombre;
        document.getElementById("perfil-usuario").textContent = "@" + usuarioActivo.usuario;
        document.getElementById("perfil-email").textContent = usuarioActivo.email;
        document.getElementById("perfil-avatar").alt = "Foto de perfil de " + usuarioActivo.nombre;

        // Plan: si no compró ninguno, es Gratis
        const plan = planes.find(p => p.id === usuarioActivo.plan);
        document.getElementById("perfil-plan").textContent = plan ? plan.nombre : "Gratis";

        // Miembro desde (ej: "noviembre de 2026")
        let miembroDesde = "-";
        if (usuarioActivo.fechaRegistro) {
            miembroDesde = new Date(usuarioActivo.fechaRegistro)
                .toLocaleDateString("es-AR", { month: "long", year: "numeric" });
        }
        document.getElementById("perfil-miembro").textContent = "Miembro desde: " + miembroDesde;

        // Logros (si todavía no tiene, mostramos 0)
        document.getElementById("perfil-insignias").textContent = (usuarioActivo.insignias || 0) + " obtenidas";
        document.getElementById("perfil-racha").textContent = "🔥 " + (usuarioActivo.racha || 0) + " días";
        document.getElementById("perfil-xp").textContent = (usuarioActivo.xp || 0) + " XP";

        // Idioma guardado (si no eligió, Español)
        document.getElementById("idioma").value = usuarioActivo.idioma || "es";
    };

    mostrarDatos();

    // ---------- 2. Abrir y cerrar los modales ----------
    document.querySelectorAll(".btn-editar").forEach(boton => {
        boton.addEventListener("click", () => {
            const modal = document.getElementById(boton.dataset.modal);
            modal.querySelector("form").reset();               // limpiamos los campos
            modal.querySelector(".mensaje-error").textContent = ""; // y el mensaje anterior
            modal.showModal();
        });
    });

    document.querySelectorAll(".boton-cerrar").forEach(boton => {
        boton.addEventListener("click", () => {
            boton.closest("dialog").close(); // cierra el modal donde está el botón
        });
    });

    // ---------- 3. Guardar lo que se edita en cada modal ----------
    // campo: "nombre", "usuario" o "email" (como se llama en el objeto usuario)
    const editarDato = (campo, idModal, idInputNuevo, idInputPass) => {
        const modal = document.getElementById(idModal);
        const formulario = modal.querySelector("form");
        const mensaje = modal.querySelector(".mensaje-error");

        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();

            const valorNuevo = document.getElementById(idInputNuevo).value.trim();
            const contrasena = document.getElementById(idInputPass).value.trim();

            if (valorNuevo === "" || contrasena === "") {
                mensaje.textContent = "⚠ Error: completá los dos campos.";
                return;
            }

            if (contrasena !== usuarioActivo.contrasena) {
                mensaje.textContent = "⚠ Error: la contraseña actual no es correcta.";
                return;
            }

            
            if ((campo === "nombre" || campo === "usuario") && contieneOfensas(valorNuevo)) {
                mensaje.textContent = "⚠ Error: contiene contenido ofensivo/explícito.";
                return;
            }

            if (campo === "email" && (!valorNuevo.includes("@") || !valorNuevo.includes("."))) {
                mensaje.textContent = "⚠ Error: ingresá un email válido (ejemplo: nombre@mail.com).";
                return;
            }

            // El usuario y el email no pueden estar usados por OTRA cuenta
            if (campo === "usuario" || campo === "email") {
                const usuarios = traerDeStorage("usuariosRegistrados") || [];
                const enUso = usuarios.find(u => u[campo] === valorNuevo && u.usuario !== usuarioActivo.usuario);
                if (enUso) {
                    mensaje.textContent = `⚠ Error: ese ${campo} ya está en uso. Probá con otro.`;
                    return;
                }
            }

            // Todo OK: guardamos
            const usuarioAnterior = usuarioActivo.usuario; // por si se cambió el nombre de usuario
            usuarioActivo[campo] = valorNuevo;
            guardarUsuarioActivo(usuarioActivo, usuarioAnterior);

            mostrarDatos();
            modal.close();
            mensajePerfil.textContent = "✔ Datos actualizados correctamente.";
        });
    };

    editarDato("nombre", "modal-nombre", "nuevo-nombre", "pass-nombre");
    editarDato("usuario", "modal-usuario", "nuevo-usuario", "pass-usuario");
    editarDato("email", "modal-email", "nuevo-email", "pass-email");

    // ---------- 4. Guardar cambios (contraseña e idioma) ----------
    const formPerfil = document.getElementById("form-perfil");
    const mensajeForm = document.getElementById("mensaje-form");

    formPerfil.addEventListener("submit", (evento) => {
        evento.preventDefault();
        mensajeForm.textContent = "";
        mensajePerfil.textContent = "";

        const actual = document.getElementById("password").value.trim();
        const nueva = document.getElementById("nueva-contraseña").value.trim();
        const confirmar = document.getElementById("confirmar-contraseña").value.trim();
        const idioma = document.getElementById("idioma").value;

        // Si escribió algo en algún campo de contraseña, quiere cambiarla
        const quiereCambiarContrasena = actual !== "" || nueva !== "" || confirmar !== "";

        if (quiereCambiarContrasena) {
            if (actual === "" || nueva === "" || confirmar === "") {
                mensajeForm.textContent = "⚠ Error: para cambiar la contraseña completá los tres campos.";
                return;
            }
            if (actual !== usuarioActivo.contrasena) {
                mensajeForm.textContent = "⚠ Error: la contraseña actual no es correcta.";
                return;
            }
            if (nueva.length < 6) {
                mensajeForm.textContent = "⚠ Error: la nueva contraseña debe tener al menos 6 caracteres.";
                return;
            }
            if (nueva === actual) {
                mensajeForm.textContent = "⚠ Error: la nueva contraseña tiene que ser distinta a la actual.";
                return;
            }
            if (nueva !== confirmar) {
                mensajeForm.textContent = "⚠ Error: las contraseñas nuevas no coinciden.";
                return;
            }
            usuarioActivo.contrasena = nueva;
        }

        usuarioActivo.idioma = idioma;
        guardarUsuarioActivo(usuarioActivo);

        // Limpiamos los campos de contraseña
        document.getElementById("password").value = "";
        document.getElementById("nueva-contraseña").value = "";
        document.getElementById("confirmar-contraseña").value = "";

        if (quiereCambiarContrasena) {
            mensajePerfil.textContent = "✔ Contraseña e idioma guardados correctamente.";
        } else {
            mensajePerfil.textContent = "✔ Idioma guardado correctamente.";
        }
    });

    // ---------- 5. Cerrar sesión ----------
    document.getElementById("boton-cerrar-sesion").addEventListener("click", () => {
        localStorage.removeItem("usuarioActivo"); // borramos solo la sesión, no la cuenta
        window.location.href = "../index.html";
    });
});