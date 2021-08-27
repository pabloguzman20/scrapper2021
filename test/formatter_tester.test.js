const formatter = require('../src/scraping_system/formatter.js');


test('Extraer googleID del LINK ingresado', () => {
    const link = 'https://docs.google.com/spreadsheets/d/1-B3FpZPj6n673FQbLblQrZe2OLYkYGZobBXsNzQclO4/edit#gid=0';
    const googleID = '1-B3FpZPj6n673FQbLblQrZe2OLYkYGZobBXsNzQclO4';

    expect(formatter.formatGoogleID(link)).toBe(googleID);
});

test('Al ingrasar directamente un googleID devuelve el id directamente', () => {
    const googleID = '1-B3FpZPj6n673FQbLblQrZe2OLYkYGZobBXsNzQclO4';
    expect(formatter.formatGoogleID(googleID)).toBe(googleID);
});