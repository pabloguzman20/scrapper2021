const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('./json/credentials.json');

let googleId = '1-B3FpZPj6n673FQbLblQrZe2OLYkYGZobBXsNzQclO4';

/**
 * Funcion asincrona que recibe un arreglo con las claves de los PVVC y los agrega al
 * documento en Google Docs.
 * @param {*} values 
 */
const addRowsGoogleSheet = async function (values) {
    const document = new GoogleSpreadsheet(googleId);
    await document.useServiceAccountAuth(credentials);
    await document.loadInfo();

    const sheet = document.sheetsByIndex[0];
    await sheet.addRows(values);
}

module.exports = {
    addRowsGoogleSheet: addRowsGoogleSheet
};