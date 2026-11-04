import { traerDeStorage } from './storage.js';
import { cursos } from './cursos.js';
import { estadoLeccion } from './progreso.js';

document.addEventListener("DOMContentLoaded", () => {
    const usuarioActivo = traerDeStorage("usuarioActivo");
    if (!usuarioActivo) {
        window.location.href = "../index.html";
        return;
    }

    const titulo = document.getElementById("titulo-curso");
    const textoUnidadActual = document.getElementById("unidad-actual");
    const contenedor = document.getElementById("unidades");

    // Leemos qué curso viene en la URL (?idioma=ingles)
    const parametros = new URLSearchParams(window.location.search);
    const curso = cursos.find(c => c.id === parametros.get("idioma"));

    // Si el curso no existe, avisamos
    if (!curso) {
        titulo.textContent = "⚠ El curso que buscás no existe";
        textoUnidadActual.textContent = "Volvé a tus cursos y elegí uno de la lista.";
        return;
    }

    document.title = "Curso " + curso.nombre;
    titulo.textContent = curso.nombre;

    let unidadActual = null; // la unidad donde está la próxima lección para hacer

    curso.unidades.forEach(unidad => {
        let html = `<h2>Unidad ${unidad.numero}: ${unidad.titulo}${unidad.premium ? " ⭐ Premium" : ""}</h2>`;

        unidad.lecciones.forEach(leccion => {
            const estado = estadoLeccion(usuarioActivo, curso, unidad.numero, leccion.numero);
            const link = `../leccion-interactiva/leccion.html?idioma=${curso.id}&unidad=${unidad.numero}&leccion=${leccion.numero}`;

            let icono = "";
            let textoEstado = "";
            let progreso = 0;
            let boton = "";

            if (estado === "completada") {
                icono = "🟢";
                textoEstado = "Completada";
                progreso = 100;
                boton = `<a href="${link}" class="boton-repasar">Repasar</a>`;
            } else if (estado === "disponible") {
                icono = "🟡";
                textoEstado = "Disponible";
                boton = `<a href="${link}" class="boton-iniciar">Empezar</a>`;
                if (!unidadActual) {
                    unidadActual = unidad; // la primera lección sin hacer marca la unidad actual
                }
            } else if (estado === "premium") {
                icono = "⭐";
                textoEstado = "Solo con Plan Premium";
                boton = `<a href="../tienda/tienda.html" class="boton-premium">Hacerme Premium</a>`;
            }

            html += `
                <section class="leccion">
                    <h3><span aria-hidden="true">${icono}</span> Lección ${leccion.numero}</h3>
                    <p>${leccion.titulo}</p>
                    <p>Estado: ${textoEstado}</p>
                    <progress value="${progreso}" max="100" aria-label="Progreso Unidad ${unidad.numero}, Lección ${leccion.numero}"></progress>
                    ${boton}
                </section>
            `;
        });

        const section = document.createElement("section");
        section.className = "unidad";
        section.innerHTML = html;
        contenedor.appendChild(section);
    });

    // Texto de arriba: en qué unidad está
    if (unidadActual) {
        textoUnidadActual.textContent = `Unidad actual: Unidad ${unidadActual.numero}: ${unidadActual.titulo}`;
    } else if (usuarioActivo.plan !== "premium") {
        textoUnidadActual.textContent = "¡Completaste las unidades gratuitas! Con el Plan Premium podés seguir con la Unidad 3.";
    } else {
        textoUnidadActual.textContent = "🎉 ¡Felicitaciones! Completaste todo el curso. En 24 horas tendrás nuevas lecciones disponibles.";
    }
});