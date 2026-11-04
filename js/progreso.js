import { cursos } from './cursos.js';

// En el usuario se guarda así:  progreso: { ingles: ["u1l1", "u1l2"], aleman: [] }

// Devuelve la lista de lecciones completadas de un curso 
export const leccionesCompletadas = (usuario, idCurso) => {
    if (usuario.progreso && usuario.progreso[idCurso]) {
        return usuario.progreso[idCurso];
    }
    return [];
};

// Devuelve el estado de una lección
export const estadoLeccion = (usuario, curso, numUnidad, numLeccion) => {
    const completadas = leccionesCompletadas(usuario, curso.id);
    const unidad = curso.unidades.find(u => u.numero === numUnidad);

    
    if (completadas.includes(`u${numUnidad}l${numLeccion}`)) {
        return "completada";
    }

   
    if (unidad.premium && usuario.plan !== "premium") {
        return "premium";
    }

  
    return "disponible";
};

// Porcentaje de completado 
export const porcentajeCurso = (usuario, idCurso) => {
    const curso = cursos.find(c => c.id === idCurso);
    if (!curso) return 0;

    let totalLecciones = 0;
    curso.unidades.forEach(unidad => {
        totalLecciones += unidad.lecciones.length;
    });

    const completadas = leccionesCompletadas(usuario, idCurso).length;
    return Math.round(completadas / totalLecciones * 100);
};