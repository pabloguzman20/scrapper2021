const scraper = require('../src/scraping_system/scraper.js');

test('Scraper login retorna FALSE con malas credenciales', async () => {
    const isLogged = await scraper.credentialsValidation("fakeuser","fakepassword");
    expect(isLogged).toBe(false);
});

// test('Scraper login retorna TRUE con buenas credenciales', async () => {
//     const isLogged = await scraper.credentialsValidation("hernan.castro","*****");
//     expect(isLogged).toBe(true);
// });
