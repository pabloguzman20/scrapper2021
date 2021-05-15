const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('./json/credentials.json');

// let googleId = '1-B3FpZPj6n673FQbLblQrZe2OLYkYGZobBXsNzQclO4';

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
        await sheet.addRows(values);
        return 'Excelente';
    } catch (error) {
        return (error.toString().includes('403')) ? 'El sistema no tiene permisos de editor en el documento.' : 'El url/googleId no fue encontrado.';
    }
}

const authGoogleService = async function (googleId) {
    try {
        const document = new GoogleSpreadsheet(googleId);
        await document.useServiceAccountAuth(credentials);
        await document.loadInfo();
    } catch (error) {
        return error.toString();
    }
}

module.exports = {
    addRowsGoogleSheet: addRowsGoogleSheet,
    authGoogleService: authGoogleService
};