import { traerDeStorage, guardarEnStorage } from './storage.js';
import { porcentajeCurso } from './progreso.js';

document.addEventListener("DOMContentLoaded", () => {
    const usuarioActivo = traerDeStorage("usuarioActivo");
    if (!usuarioActivo) {
        alert("No has iniciado sesión. Redirigiendo al login...");
        window.location.href = "../index.html";
        return;
    }

    const todosLosCursos = [
        { id: "ingles", nombre: "Inglés desde Español", bandera: "🇬🇧", nivel: "Intermedio (B1)" },
        { id: "aleman", nombre: "Alemán desde Español", bandera: "🇩🇪", nivel: "Intermedio (B1)" },
        { id: "chino", nombre: "Chino desde Español", bandera: "🇨🇳", nivel: "Inicial (HSK 1)" }
    ];

    let cursosDelUsuario = traerDeStorage("cursosActivos");
    if (!cursosDelUsuario) {
        cursosDelUsuario = todosLosCursos;
        guardarEnStorage("cursosActivos", cursosDelUsuario);
    }

    const main = document.querySelector("main");

    // Borramos el contenedor viejo si existe (por si recargamos)
    const contenedorViejo = document.getElementById("contenedor-cursos");
    if (contenedorViejo) contenedorViejo.remove();

    // Creamos el contenedor principal
    const contenedorCursos = document.createElement("div");
    contenedorCursos.id = "contenedor-cursos";

    contenedorCursos.style.gridColumn = "1 / -1";
    contenedorCursos.style.display = "grid";
    contenedorCursos.style.gridTemplateColumns = "repeat(3, 1fr)";
    contenedorCursos.style.gap = "1.5rem";
    contenedorCursos.style.marginTop = "1rem";

    const dibujarTarjetas = () => {
        contenedorCursos.innerHTML = ""; // Limpiamos todo (tarjetas y botón anterior)

        // 1. Dibujamos las tarjetas (el progreso sale de las lecciones que completó el usuario)
        cursosDelUsuario.forEach(curso => {
            const progreso = porcentajeCurso(usuarioActivo, curso.id);
           let textoBoton = "Continuar";
           if (progreso === 0) {
            textoBoton = "Empezar";
              } else if (progreso === 100) {
                textoBoton = "Repasar";
            }
            const article = document.createElement("article");
            article.className = "cursos";
            article.innerHTML = `
                <h3><span aria-hidden="true">${curso.bandera}</span> ${curso.nombre}</h3>
                <p>Progreso: ${progreso}%</p>
                <p>Nivel: ${curso.nivel}</p>
                <a href="../mapa-de-unidades-y-lecciones/curso.html?idioma=${curso.id}">${textoBoton}</a>
                <a href="#" class="quitar" data-id="${curso.id}">Quitar</a>
            `;
            contenedorCursos.appendChild(article);
        });
        // 2. Mostrar aviso si TODOS los cursos activos del usuario se completaron al 100%
        const todosCompletos = cursosDelUsuario.length > 0 && 
            cursosDelUsuario.every(c => porcentajeCurso(usuarioActivo, c.id) === 100);

        if (todosCompletos) {
            const avisoCompletado = document.createElement("div");
            avisoCompletado.className = "aviso-completado";
            avisoCompletado.textContent = "🎉 ¡Felicitaciones! Completaste todos los cursos. En 24 horas tendrás nuevas lecciones disponibles.";
            contenedorCursos.insertBefore(avisoCompletado, contenedorCursos.firstChild);
        }

        // 3. Si faltan cursos, mostramos el botón de restaurar
        if (cursosDelUsuario.length < todosLosCursos.length) {
            const btnRestaurar = document.createElement("a");
            btnRestaurar.href = "#";
            btnRestaurar.className = "restaurar";
            btnRestaurar.textContent = "Restaurar todos los cursos";

            // Estilos para que se vea bien en la grilla
            btnRestaurar.style.gridColumn = "1 / -1";
            btnRestaurar.style.textAlign = "center";
            btnRestaurar.style.marginTop = "1rem";
            btnRestaurar.style.display = "inline-block";

            btnRestaurar.addEventListener("click", (e) => {
                e.preventDefault();
                cursosDelUsuario = todosLosCursos; // Restauramos los 3
                guardarEnStorage("cursosActivos", cursosDelUsuario);
                dibujarTarjetas(); // Volvemos a dibujar
            });

            contenedorCursos.appendChild(btnRestaurar); // Lo metemos ADENTRO del contenedor
        }
    };

    // Escuchamos el clic en "Quitar"
    contenedorCursos.addEventListener("click", (e) => {
        if (e.target.classList.contains("quitar")) {
            e.preventDefault();
            const idCurso = e.target.getAttribute("data-id");

            // Filtramos los cursos
            cursosDelUsuario = cursosDelUsuario.filter(c => c.id !== idCurso);
            guardarEnStorage("cursosActivos", cursosDelUsuario);

            dibujarTarjetas(); // Volvemos a dibujar (esto limpia el anterior y crea el nuevo)
        }
    });

    // Arrancamos
    dibujarTarjetas();
    main.appendChild(contenedorCursos);
});