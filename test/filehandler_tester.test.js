const filehandler = require('../src/scraping_system/filehandler.js');


test('Guardar Google id', () => {
    const googleid= '1EdI9yDpm4veIRiNOkGwyNwez4C_3VqxFwvEJuL3W0Ck';

    expect(filehandler.saveGoogleID(googleid)).toBe(true);
});


// test('Cargar GOOGLE ID', () => {
//     const googleid= '1-B3FpZPj6n673FQbLblQrZe2OLYkYGZobBXsNzQclO4';

//     expect(filehandler.loadGoogleID()).toBe(googleid);
// });
