// Función para guardar datos en el Local Storage
export const guardarEnStorage = (clave, valor) => {
    localStorage.setItem(clave, JSON.stringify(valor));
};

// Función para traer datos del Local Storage
export const traerDeStorage = (clave) => {
    const valor = localStorage.getItem(clave);
    // Si existe el valor,lo convertimos de string a objeto
    // Si no existe, devolvemos null
    return valor ? JSON.parse(valor) : null;
};

// Función para guardar el usuario activo y actualizar la lista de usuarios registrados
// "usuarioAnterior" es el nombre de usuario que tenía antes de la actualización (si es que lo cambió)
export const guardarUsuarioActivo = (usuarioActivo, usuarioAnterior) => {
    guardarEnStorage("usuarioActivo", usuarioActivo);

    const nombreABuscar = usuarioAnterior || usuarioActivo.usuario;
    const usuarios = traerDeStorage("usuariosRegistrados") || [];
    const posicion = usuarios.findIndex(u => u.usuario === nombreABuscar);
    if (posicion !== -1) {
        usuarios[posicion] = usuarioActivo;
        guardarEnStorage("usuariosRegistrados", usuarios);
    }
};