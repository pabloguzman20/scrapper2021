const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('./json/credentials.json');

let googleId = '1-B3FpZPj6n673FQbLblQrZe2OLYkYGZobBXsNzQclO4';

//values es un arreglo de valores para la fila
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