const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('./json/credentials.json');

// let googleId = '1-B3FpZPj6n673FQbLblQrZe2OLYkYGZobBXsNzQclO4';

/**
 * Devuelve las cabeceras del documento. 
 * @returns string Devuelve las cabeceras del documento.
 */
const getHeaders = function () {
    return [
        'Campus',
        'Unidad Academica',
        'No. de programa Educativo',
        'Programa Educativo',
        'Plan de Estudios',
        'Matrícula del alumno',
        'Nombre del alumno',
        'Estado',
        'Clave del PVVC en Kardex',
        'Nombre del PVVC en el kardex',
        'ID del Proyecto en el SIFPVU',
        'Nombre del PVVC en el SIFPVU',
        'Creditos del proyecto',
        'Fecha de inicio',
        'Fecha de término',
        'Clave de la Unidad de Aprendizaje 1',
        'Nombre de la Unidad de Aprendizaje 1',
        'Creditos de la Unidad de Apendizaje 1',
        'Clave de la Unidad de Aprendizaje 2',
        'Nombre de la Unidad de Aprendizaje 2',
        'Creditos de la Unidad de Apendizaje 2',
        'Clave de la Unidad de Aprendizaje 3',
        'Nombre de la Unidad de Aprendizaje 3',
        'Creditos de la Unidad de Apendizaje 3',
        'Clave de la Unidad de Aprendizaje 4',
        'Nombre de la Unidad de Aprendizaje 4',
        'Creditos de la Unidad de Apendizaje 4',
        'Nombre de la Empresa (unidad receptora)',
        'Numero de empleado del profesor',
        'Nombre del profesor, tutor o investigador' 
    ];
}
/**
 * Recibe un arreglo con las claves de los PVVC y los agrega al
 * documento en Google Docs.
 * @param {*} values 
 */
const addRowsGoogleSheet = async function (values, googleId) {
    try {
        const document = new GoogleSpreadsheet(googleId);
        await document.useServiceAccountAuth(credentials);
        await document.loadInfo();

        const sheet = document.sheetsByIndex[0];
        await sheet.clear(); 
        await sheet.resize({ rowCount: (values.length + 1) , columnCount: 30 });
        await sheet.setHeaderRow(getHeaders());
        await sheet.addRows(values);
        return ['Se ha completado con exito la operación.'];
    } catch (error) {
        console.log('Google Service error: ' + error);
        return (error.toString().includes('403')) ? 'El sistema no tiene permisos de editor en el documento.' : 'El url/googleId no fue encontrado.';
    }
}

const authGoogleService = async function (googleId) {
    try {
        const document = new GoogleSpreadsheet(googleId);
        await document.useServiceAccountAuth(credentials);
        await document.loadInfo();
        return 'Vínculo correcto.';
    } catch (error) {
        return (error.toString().includes('403')) ? 'El sistema no tiene permisos de editor en el documento.' : 'El url/googleId no fue encontrado.';
    }
}


module.exports = {
    addRowsGoogleSheet: addRowsGoogleSheet,
    authGoogleService: authGoogleService
};