const scraper = require('../src/scraping_system/scraper.js');


test('Iniciar navegador con el módulo scrapper', async () => {
    const { browser, page } = await scraper.startBrowser();
    try {
        await page.goto('https://google.com');
        await expect(page.title()).resolves.toMatch('Google');
    } catch (error) {
        console.log(error);
    } finally {
        await browser.close();
    }
});

test('Scraper login retorna FALSE con malas credenciales', async () => {
    const { browser, page } = await scraper.startBrowser();
    try {
        const isLogged = await scraper.login(page, 'fakeuser', 'fakerpassword');
        expect(isLogged).toBe(false);
    } catch (error) {
        console.log(error);
    } finally {
        browser.close();
    }
});

