const scraper = require("../scraping_system/scraper.js");
const filehandler = require("../scraping_system/filehandler.js");
const routes = require('./browserpath_handler.js')
let username = "";
let password = "";
let path = "";
let product = "";

/**
 * Comunicación entre vista renderizada y el proceso principal, permite validar el login.
 */
global.share.ipcMain.handle("login", async (event, args) => {
  username = JSON.parse(args[0]);
  password = JSON.parse(args[1]);
  getBrowserPath();
  const { browser, page } = await scraper.startBrowser(path,product);
  try {
    const isLogged = await scraper.login(page, username, password);
    return isLogged;
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
  }
});

/**
 * Comunicacion entre la vista renderizada y el proceso principal, permite ejecutar el scrapper.
 */
global.share.ipcMain.handle("scrap", async (event, args) => {
  const { browser, page } = await scraper.startBrowser(path,product);
  try {
    await scraper.iniciarScrapping(page, username, password);
  } catch (error) {
    console.log("scrap" + error);
  } finally {
    await browser.close();
  }
});

/**
 * Comunicacion entre la vista renderizada y el proceso principal, permite cargar los GoogleID existentes.
 */
global.share.ipcMain.handle("loadGoogleId", async (event, args) => {
  try {
    const googleid = filehandler.loadGoogleID();
    return googleid.googleid;
  } catch (error) {
    console.log("loadGoogleId" + error);
  }
});

/**
 * Comunicacion entre la vista renderizada y el proceso principal, permite guardar el GoogleID en un JSON.
 */
global.share.ipcMain.handle("saveGoogleId", async (event, args) => {
  const googleId = JSON.parse(args[0]);
  try {
    return filehandler.saveGoogleID(googleId);
  } catch (error) {
    console.log(error);
  }
});

/**
 * Funcion que busca en la string del ProgramFile para determinar el navegador que utiliza el cliente.
 */
function getBrowserPath() {
  path = routes.getPath();
  if (path.search('firefox') != -1) {
    product = 'firefox';
  } else {
    product = 'chrome';
  }
}

