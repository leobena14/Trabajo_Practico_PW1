import { guardarEnStorage, traerDeStorage } from './storage.js';

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("form");

    const palabrasProhibidas = ["boludo", "boluda","pelotudo", "pelotuda","forro", "forra",
  "pajero", "pajera","sorrete","cagon", "cagona","gorreado", "gorreada","malparido", "malparida","concha", "conchuda", "conchudo",
  "pija","chota","orto","puto", "puta","trolo", "trola","hdp", "hijodeputa","hdmp", "hijodemilputa","gil", "gilastrun","culiao", "culia",
  "culiado","culiada","culiando","culiandome","culiandonos","judio","judia","judios","judias","negro", "negra","negros", "negras","gay"];

    //verifica si algún texto contiene términos de la lista
    function contieneOfensas(...textos) {
        return textos.some(texto => {
            const textoMinusculas = texto.toLowerCase();
            return palabrasProhibidas.some(palabra => 
            textoMinusculas.includes(palabra.toLowerCase()));
        });
    }

    formulario.addEventListener("submit", (evento) => {
        
        // Frenamos la recarga
        evento.preventDefault(); 

        // Agarramos los valores de los inputs (usando los ID de tu HTML)
        const email = document.getElementById("email").value.trim();
        const contrasena = document.getElementById("contrasena").value.trim();
        const nombre = document.getElementById("nombre").value.trim();
        const usuario = document.getElementById("usuario").value.trim();
        const edad = document.getElementById("edad").value.trim();

        // Validación básica (el navegador ya valida con 'required', pero por las dudas)
        if (!email || !contrasena || !nombre || !usuario || !edad) {
            alert("Por favor, completá todos los campos.");
            return;
        }
        // Validación de contenido ofensivo en el nombre y nombre de usuario
        if (contieneOfensas(nombre, usuario)) {
            alert("Contiene contenido ofensivo/explícito.");
            return;
        }

        // Traemos la lista de usuarios (si no existe, creamos un array vacío)
        let usuarios = traerDeStorage("usuariosRegistrados") || [];

        // Verificamos que el usuario o email no estén ya registrados
        const usuarioExiste = usuarios.find(u => u.usuario === usuario || u.email === email);
        if (usuarioExiste) {
            alert("El nombre de usuario o el correo ya están en uso. Probá con otro.");
            return;
        }

        // Creamos el nuevo usuario
        const nuevoUsuario = { email, contrasena, nombre, usuario, edad, fechaRegistro: new Date().toISOString() };
        
        // Lo agregamos a la lista y lo guardamos
        usuarios.push(nuevoUsuario);
        guardarEnStorage("usuariosRegistrados", usuarios);

        alert("¡Registro exitoso! Ahora podés iniciar sesión.");
        window.location.href = "../index.html"; // Lo mandamos al login
    });
});