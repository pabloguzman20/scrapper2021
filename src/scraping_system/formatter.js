const $ = require('cheerio'); //Se carga la biblioteca de cheerio.
const { ipcMain } = require('electron');

/**
 * Funcion que que formatea el archivo JSON.
 * @param {*} msn 
 * @returns 
 */
const formatMessage = function(msn,segundo) {
    const unidadAp = processUnidadDeAprendizaje(msn.unidadAp);
    return {
        'Campus': msn.pvvc.campus,
        'Unidad Academica': (msn.unidadAcademica.id_unidad_academica + " - " +  msn.unidadAcademica.nombre_unidad_academica).trim(),
        'No. de programa Educativo': (segundo.programas).substr(0,6),
        'Programa Educativo': (segundo.programas).substr(8),
        'Plan de Estudios': msn.pvvc.plan_estudios,
        'Matrícula del alumno': segundo.matricula,
        'Nombre del alumno': segundo.nombreAlumno,
        'Estado': segundo.estado,
        'Clave del PVVC en Kardex': segundo.id,
        'Nombre del PVVC en el kardex': segundo.nombrePrograma,
        'ID del Proyecto en el SIFPVU': msn.pvvc.id_pvvc,
        'Nombre del PVVC en el SIFPVU': msn.pvvc.nombre_pvvc,
        'Creditos del proyecto': 'N/A',
        'Fecha de inicio': msn.pvvc.fecha_inicio,
        'Fecha de término': segundo.fechaF || 'N/A',
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
        'Nombre de la Empresa (unidad receptora)': segundo.ur,
        'Numero de empleado del profesor': (segundo.responsableUA).substr(0,5),
        'Nombre del profesor, tutor o investigador': (segundo.responsableUA).substr(6)  
    };
}

/**
 * Funcion donde se llenan los campos de unidad de aprendizaje.
 * @param {*} unidadAp 
 * @returns 
 */
const processUnidadDeAprendizaje = function(unidadAp){
    let array = [];

    for(let c = 0; c < 12; c++){
        array[c] = 'N/A';
    }
    
    $('td',unidadAp ).each(function( index ) {
        array[index] = $( this ).text();
      });
    return array;
}


const formatGoogleID = function(link){
    if(link.includes('/')){
       const array = link.split('/');
       const index = array.findIndex(element => element === 'd');
       return array[index + 1];
    }else{
        return link; 
    }
}

module.exports = {
    formatMessage: formatMessage,
    formatGoogleID: formatGoogleID
};