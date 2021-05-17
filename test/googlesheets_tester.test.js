const gs = require('../src/scraping_system/googlesheets.js');


test('Autenticación a Google Service con credenciales erroneas', async () => {
    expect(await gs.addRowsGoogleSheet(null, '1EdI9yDpm4veIRiNOkGwyNwez4C_3VqxFwvEJuL3W0Ck')).toMatch('El sistema no tiene permisos de editor en el documento.');
});

test('Autenticación a Google Service con googleid inexistente', async () => {
    expect(await gs.addRowsGoogleSheet(null, 'error')).toMatch('El url/googleId no fue encontrado.');
});

test('Autenticación a Google Service con credenciales correctas', async () => {
    expect(await gs.authGoogleService('1-B3FpZPj6n673FQbLblQrZe2OLYkYGZobBXsNzQclO4')).toMatch('Vínculo correcto.');
});