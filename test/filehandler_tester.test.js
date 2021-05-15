const filehandler = require('../src/scraping_system/filehandler.js');


test('Guardar Google id', () => {
    const googleid= '1-B3FpZPj6n673FQbLblQrZe2OLYkYGZobBXsNzQclO4';

    expect(filehandler.saveGoogleID(googleid)).toBe(true);
});


// test('Cargar GOOGLE ID', () => {
//     const googleid= '1-B3FpZPj6n673FQbLblQrZe2OLYkYGZobBXsNzQclO4';

//     expect(filehandler.loadGoogleID().googleid).toBe(googleid);
// });
