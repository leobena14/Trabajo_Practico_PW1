import { traerDeStorage, guardarUsuarioActivo } from './storage.js';
import { cursos } from './cursos.js';
import { estadoLeccion } from './progreso.js';

document.addEventListener("DOMContentLoaded", () => {
    const usuarioActivo = traerDeStorage("usuarioActivo");
    if (!usuarioActivo) {
        window.location.href = "../index.html";
        return;
    }

    const main = document.querySelector("main");
    const barraProgreso = document.getElementById("barra-progreso");
    const textoVidas = document.getElementById("vidas");

    // ---------- 1. Leer la URL (?idioma=ingles&unidad=1&leccion=2) ----------
    const parametros = new URLSearchParams(window.location.search);
    const idCurso = parametros.get("idioma");
    const numUnidad = Number(parametros.get("unidad"));
    const numLeccion = Number(parametros.get("leccion"));

    const curso = cursos.find(c => c.id === idCurso);
    let unidad = undefined;
    let leccion = undefined;
    if (curso) {
        unidad = curso.unidades.find(u => u.numero === numUnidad);
    }
    if (unidad) {
        leccion = unidad.lecciones.find(l => l.numero === numLeccion);
    }

    const linkMapa = `../mapa-de-unidades-y-lecciones/curso.html?idioma=${idCurso}`;
    document.getElementById("boton-salir").href = linkMapa;

    // Muestra un aviso en lugar de la lección (lección inexistente o solo Premium)
    const mostrarAviso = (texto, linkHTML) => {
        document.querySelector(".barra-leccion").remove(); // sacamos la barra de vidas y progreso
        main.innerHTML = `
            <section class="caja-leccion" role="alert">
                <h1>${texto}</h1>
                ${linkHTML}
            </section>
        `;
    };

    if (!leccion) {
        mostrarAviso("⚠ La lección que buscás no existe.",
            `<a href="../dashboard/dashboard-principal.html" class="boton-comprobar">Ir a mis cursos</a>`);
        return;
    }

    // Si la lección es Premium y el usuario no tiene ese plan, no puede entrar (aunque escriba la URL)
    const estado = estadoLeccion(usuarioActivo, curso, numUnidad, numLeccion);
    if (estado === "premium") {
        mostrarAviso("⭐ Esta lección es solo para el Plan Premium.",
            `<a href="../tienda/tienda.html" class="boton-comprobar">Ir a la tienda</a>
             <a href="${linkMapa}" class="boton-comprobar">Volver al mapa</a>`);
        return;
    }

    document.title = `Lección ${numLeccion} - ${leccion.titulo}`;

    // ---------- 2. Salir con la X (pide confirmación) ----------
    let leccionTerminada = false;
    const cajaSalida = document.getElementById("confirmar-salida");

    document.getElementById("boton-salir").addEventListener("click", (evento) => {
        if (!leccionTerminada) {
            evento.preventDefault(); // no salimos todavía, primero preguntamos
            cajaSalida.hidden = false;
        }
    });
    document.getElementById("boton-si-salir").addEventListener("click", () => {
        window.location.href = linkMapa;
    });
    document.getElementById("boton-no-salir").addEventListener("click", () => {
        cajaSalida.hidden = true;
    });

    // ---------- 3. Guardar la lección como completada y sumar XP ----------
    const guardarAvance = (xpGanada) => {
        leccionTerminada = true;
        usuarioActivo.xp = (usuarioActivo.xp || 0) + xpGanada;

        if (!usuarioActivo.progreso) {
            usuarioActivo.progreso = {};
        }
        if (!usuarioActivo.progreso[curso.id]) {
            usuarioActivo.progreso[curso.id] = [];
        }

        const idLeccion = `u${numUnidad}l${numLeccion}`;
        if (!usuarioActivo.progreso[curso.id].includes(idLeccion)) {
            usuarioActivo.progreso[curso.id].push(idLeccion);
        }

        guardarUsuarioActivo(usuarioActivo);
    };

    const botonesFinales = `
        <a href="${linkMapa}" class="boton-comprobar">Volver al mapa</a>
        <a href="leccion.html${window.location.search}" class="boton-comprobar">Repetir lección</a>
    `;

    // ---------- 4. Lección de tipo REPASO (tarjetas) ----------
    const mostrarRepaso = () => {
        textoVidas.textContent = "";

        let tarjetasHTML = "";
        leccion.tarjetas.forEach((tarjeta, index) => {
            let audioHTML = "";
            if (tarjeta.audio) {
                audioHTML = `
                    <div class="audio-container">
                        <audio id="audio-tarjeta-${index}" src="../audio/${tarjeta.audio}"></audio>
                        <button type="button" class="boton-audio" data-audio-id="audio-tarjeta-${index}" aria-label="Reproducir audio">🔊 Escuchar</button>
                    </div>
                `;
            }
            tarjetasHTML += `
                <article class="tarjeta">
                    <p lang="${curso.lang}"><strong>${tarjeta.palabra}</strong></p>
                    <p>${tarjeta.traduccion}</p>
                    ${audioHTML}
                </article>
            `;
        });

        main.innerHTML = `
            <h1 class="titulo-repaso">Lección ${numLeccion} - ${leccion.titulo}</h1>
            <section class="repaso">${tarjetasHTML}</section>
            <button type="button" id="boton-terminar" class="boton-comprobar">Terminar repaso</button>
        `;

           const botonesAudio = document.querySelectorAll(".boton-audio");
        botonesAudio.forEach(boton => {
            boton.addEventListener("click", () => {
                const idAudio = boton.getAttribute("data-audio-id");
                document.getElementById(idAudio).play();
            });
        });

        document.getElementById("boton-terminar").addEventListener("click", () => {
            barraProgreso.value = 100;
            guardarAvance(10);
            main.innerHTML = `
                <section class="caja-leccion" role="status">
                    <h1>¡Repaso completado!</h1>
                    <p>XP ganada: +10 XP</p>
                    <p>✔ Tu avance quedó guardado.</p>
                    ${botonesFinales}
                </section>
            `;
        });
    };

    // ---------- 5. Lección de tipo EJERCICIOS (banco de palabras) ----------
    const ejercicios = leccion.ejercicios || [];
    const total = ejercicios.length;
    let indice = 0;          // número de ejercicio actual (empieza en 0)
    let errores = 0;         // cuántas veces se equivocó en toda la lección
    let elegidas = [];       // palabras que el usuario puso en "Tu respuesta"
    let disponibles = [];    // palabras que quedan en el banco
    let comprobado = false;  // true cuando ya respondió bien este ejercicio

    const vidasIlimitadas = usuarioActivo.plan === "premium";
    let vidas = 3;
    if (usuarioActivo.plan === "basico") {
        vidas = 5;
    }

    const mostrarVidas = () => {
        if (vidasIlimitadas) {
            textoVidas.textContent = "❤️ Vidas: ilimitadas";
        } else {
            textoVidas.textContent = `❤️ Vidas: ${vidas}`;
        }
    };

    // Mezcla las palabras para que no aparezcan siempre en el mismo orden
    const mezclar = (lista) => lista.sort(() => Math.random() - 0.5);

    // Dibuja los botones de "Tu respuesta" y del "Banco de palabras"
    const dibujarPalabras = () => {
        const zonaRespuesta = document.getElementById("zona-respuesta");
        const zonaBanco = document.getElementById("zona-banco");
        zonaRespuesta.innerHTML = "";
        zonaBanco.innerHTML = "";

        if (elegidas.length === 0) {
            zonaRespuesta.innerHTML = `<p class="texto-vacio">Tocá las palabras del banco para armar tu respuesta</p>`;
        }

        // Tocar una palabra de la respuesta la devuelve al banco
        elegidas.forEach((palabra, posicion) => {
            const boton = document.createElement("button");
            boton.type = "button";
            boton.textContent = palabra;
            boton.disabled = comprobado;
            boton.addEventListener("click", () => {
                elegidas.splice(posicion, 1);
                disponibles.push(palabra);
                dibujarPalabras();
            });
            zonaRespuesta.appendChild(boton);
        });

        // Tocar una palabra del banco la agrega al final de la respuesta
        disponibles.forEach((palabra, posicion) => {
            const boton = document.createElement("button");
            boton.type = "button";
            boton.textContent = palabra;
            boton.disabled = comprobado;
            boton.addEventListener("click", () => {
                disponibles.splice(posicion, 1);
                elegidas.push(palabra);
                dibujarPalabras();
            });
            zonaBanco.appendChild(boton);
        });
    };

    const mostrarEjercicio = () => {
        const ejercicio = ejercicios[indice];
        elegidas = [];
        disponibles = mezclar(ejercicio.respuesta.concat(ejercicio.extras));
        comprobado = false;
     
        let audioHTML = "";
        if (ejercicio.audio) {
            audioHTML = `
                <div class="audio-container">
                    <audio id="audio-ejercicio" src="../audio/${ejercicio.audio}"></audio>
                    <button type="button" id="boton-audio" class="boton-audio" aria-label="Reproducir audio">🔊 Escuchar</button>
                </div>
            `;
        }
        main.innerHTML = `
            <strong>Ejercicio ${indice + 1}/${total}</strong>
            <h1>${ejercicio.consigna}</h1>
            <p lang="${ejercicio.lang}">${ejercicio.texto}</p>
            ${audioHTML}

            <section>
                <h2>Tu respuesta</h2>
                <div id="zona-respuesta" class="zona-palabras"></div>
            </section>

            <section>
                <h2>Banco de palabras disponibles</h2>
                <div id="zona-banco" class="zona-palabras"></div>
            </section>

            <p id="mensaje-ejercicio" role="status"></p>

            <footer>
                <button type="button" id="boton-comprobar" class="boton-comprobar">Comprobar</button>
                <button type="button" id="boton-continuar" class="boton-comprobar" hidden>Continuar</button>
            </footer>
        `;

        dibujarPalabras();
        // --- LÓGICA DEL BOTÓN DE AUDIO ---
        const botonAudio = document.getElementById("boton-audio");
        if (botonAudio) {
            botonAudio.addEventListener("click", () => {
                document.getElementById("audio-ejercicio").play();
            });
        }
        document.getElementById("boton-comprobar").addEventListener("click", comprobar);
        document.getElementById("boton-continuar").addEventListener("click", continuar);
    };

    const comprobar = () => {
        const ejercicio = ejercicios[indice];
        const mensaje = document.getElementById("mensaje-ejercicio");

        // Validación: no se puede comprobar sin elegir palabras (no resta vidas)
        if (elegidas.length === 0) {
            mensaje.className = "mensaje-incorrecto";
            mensaje.textContent = "⚠ Elegí al menos una palabra antes de comprobar.";
            return;
        }

        // Comparamos las palabras elegidas con la respuesta correcta
        const esCorrecta = elegidas.join(" ") === ejercicio.respuesta.join(" ");

        if (esCorrecta) {
            comprobado = true;
            dibujarPalabras(); // vuelve a dibujar con los botones deshabilitados
            mensaje.className = "mensaje-correcto";
            mensaje.textContent = "✔ ¡Correcto!";

            indice++;
            barraProgreso.value = indice / total * 100;

            // Cambiamos "Comprobar" por "Continuar"
            document.getElementById("boton-comprobar").hidden = true;
            const botonContinuar = document.getElementById("boton-continuar");
            botonContinuar.hidden = false;
            botonContinuar.focus();
        } else {
            // Se equivocó: pierde una vida y se queda en el MISMO ejercicio
            errores++;
            if (!vidasIlimitadas) {
                vidas--;
            }
            mostrarVidas();

            // Si no le quedan vidas, termina la lección
            if (!vidasIlimitadas && vidas === 0) {
                mostrarSinVidas();
                return;
            }

            mensaje.className = "mensaje-incorrecto";
            if (vidasIlimitadas) {
                mensaje.textContent = "✖ Respuesta incorrecta. Intentá de nuevo.";
            } else if (vidas === 1) {
                mensaje.textContent = "✖ Respuesta incorrecta. Te queda 1 vida. Intentá de nuevo.";
            } else {
                mensaje.textContent = `✖ Respuesta incorrecta. Te quedan ${vidas} vidas. Intentá de nuevo.`;
            }
        }
    };

    const continuar = () => {
        if (indice === total) {
            mostrarResumen();
        } else {
            mostrarEjercicio();
        }
    };

    // Resumen final: la lección se completó
    const mostrarResumen = () => {
        const xpGanada = total * 10; // 10 XP por cada ejercicio
        guardarAvance(xpGanada);

        main.innerHTML = `
            <section class="caja-leccion" role="status">
                <h1>¡Lección completada! 🎉</h1>
                <p>Ejercicios completados: ${total} de ${total}</p>
                <p>Errores: ${errores}</p>
                <p>XP ganada: +${xpGanada} XP</p>
                <p>✔ Tu avance quedó guardado.</p>
                ${botonesFinales}
            </section>
        `;
    };

    // Se quedó sin vidas: NO se guarda la lección
    const mostrarSinVidas = () => {
        leccionTerminada = true;
        main.innerHTML = `
            <section class="caja-leccion" role="alert">
                <h1>Te quedaste sin vidas 💔</h1>
                <p>Llegaste al ejercicio ${indice + 1} de ${total}.</p>
                <p>✖ El avance de esta lección no se guardó. ¡Intentalo de nuevo!</p>
                <a href="leccion.html${window.location.search}" class="boton-comprobar">Reintentar</a>
                <a href="${linkMapa}" class="boton-comprobar">Volver al mapa</a>
                <a href="../tienda/tienda.html" class="boton-comprobar">Conseguir más vidas</a>
            </section>
        `;
    };

    // ---------- 6. Arrancamos según el tipo de lección ----------
    if (leccion.tipo === "repaso") {
        mostrarRepaso();
    } else {
        mostrarVidas();
        mostrarEjercicio();
    }
});