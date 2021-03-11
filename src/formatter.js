const $ = require('cheerio');

const formatMessage = function(msn) {
    const unidadAp = processUnidadDeAprendizaje(msn.unidadAp);
    return {
        'Campus': msn.pvvc.campus,
        'Unidad Academica': (msn.unidadAcademica.id_unidad_academica + " - " +  msn.unidadAcademica.nombre_unidad_academica).trim(),
        'No. de programa Educativo': 'vacio',
        'Programa Educativo': 'vacio', 
        'Plan de Estudios': msn.pvvc.plan_estudios,
        'Matrícula del alumno': 'vacio',
        'Nombre del alumno': 'vacio',
        'Clave del PVVC en el kardex 23349 PVVC I 23350 PVVC II': 'vacio',
        'Nombre del PVVC en el kardex': 'vacio',
        'ID del Proyecto en el SIFPVU': msn.pvvc.id_pvvc,
        'Nombre del PVVC en el SIFPVU': msn.pvvc.nombre_pvvc,
        'Creditos del proyecto': 'vacio',
        'Fecha de inicio': msn.pvvc.fecha_inicio,
        'Fecha de término': msn.pvvc.fecha_termino || 'vacio',
        'Clave de la Unidad de Aprendizaje 1': unidadAp[0],
        'Nombre de la Unidad de Aprendizaje 1': unidadAp[1],
        'Creditos de la Unidad de Apendizaje 1': unidadAp[2],
        'Clave de la Unidad de Aprendizaje 2': unidadAp[3],
        'Nombre de la Unidad de Aprendizaje 2': unidadAp[4],
        'Creditos de la Unidad de Apendizaje 2': unidadAp[5],
        'Clave de la Unidad de Aprendizaje 3': unidadAp[6],
        'Nombre de la Unidad de Aprendizaje 3': unidadAp[7],
        'Creditos de la Unidad de Apendizaje 3': unidadAp[8],
        'Clave de la Unidad de Aprendizaje 4': unidadAp[9],
        'Nombre de la Unidad de Aprendizaje 4': unidadAp[10],
        'Creditos de la Unidad de Apendizaje 4': unidadAp[11],
        'Nombre de la Empresa (unidad receptora)': 'vacio',
        'Numero de empleado del profesor': 'vacio',
        'Nombre del profesor, tutor o investigador': 'vacio'  
    };
}

// Elimina formato html de unidadAp
const processUnidadDeAprendizaje = function(unidadAp){
    let array = [];

    for(c = 0; c < 12; c++){
        array[c] = 'vacio';
    }
    
    $('td',unidadAp ).each(function( index ) {
        array[index] = $( this ).text();
      });
    return array;
}

module.exports = {
    formatMessage: formatMessage
};