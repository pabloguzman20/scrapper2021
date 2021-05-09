const scraper = require('../scraping_system/scraper.js');


/**
 * Comunicación entre vista renderizada y el proceso principal, permite validar el login.
 */
global.share.ipcMain.handle('login', async (event, args) => {
  const username = JSON.parse(args[0]);
  const password = JSON.parse(args[1]);
  const {browser, page} = await scraper.startBrowser();
  try {
    const isLogged = await scraper.login(page, username, password);

    return isLogged;
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
  }
});
