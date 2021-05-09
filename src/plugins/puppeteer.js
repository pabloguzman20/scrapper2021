const scraper = require('../scraping_system/scraper.js');
const filehandler = require('../scraping_system/filehandler.js');

/**
 * Comunicación entre vista renderizada y el proceso principal, permite validar el login.
 */
global.share.ipcMain.handle('login', async (event, args) => {
  const username = JSON.parse(args[0]);
  const password = JSON.parse(args[1]);
  const { browser, page } = await scraper.startBrowser();
  try {
    const isLogged = await scraper.login(page, username, password);
    return isLogged;
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
  }
});

global.share.ipcMain.handle('loadGoogleId', async (event, args) => {
  try {
    const googleid = filehandler.loadGoogleID();
    return googleid.googleid;
  } catch (error) {
    console.log("loadGoogleId" + error);
  }
});

global.share.ipcMain.handle('saveGoogleId', async (event, args) => {
  const googleId = JSON.parse(args[0]);
  try {
    return filehandler.saveGoogleID(googleId);
  } catch (error) {
    console.log(error);
  }
});