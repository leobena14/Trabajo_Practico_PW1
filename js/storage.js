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