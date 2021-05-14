const scraper = require("../scraping_system/scraper.js");
const filehandler = require("../scraping_system/filehandler.js");
const rutas = require('../plugins/obtenerRuta.js')
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
  path = rutas.obtenerRuta();
  if (path.search('firefox')!= -1) {
    product = 'firefox';
  } else {
    product = 'chrome';
  }
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

global.share.ipcMain.handle("scrap", async (event, args) => {
  path = rutas.obtenerRuta();
  if (path.search('firefox')!= -1) {
    product = 'firefox';
  } else {
    product = 'chrome';
  }
  try {
    await scraper.iniciarScrapping(username, password, path, product);
  } catch (error) {
    console.log("scrap" + error);
  }
});

global.share.ipcMain.handle("loadGoogleId", async (event, args) => {
  try {
    const googleid = filehandler.loadGoogleID();
    return googleid.googleid;
  } catch (error) {
    console.log("loadGoogleId" + error);
  }
});

global.share.ipcMain.handle("saveGoogleId", async (event, args) => {
  const googleId = JSON.parse(args[0]);
  try {
    return filehandler.saveGoogleID(googleId);
  } catch (error) {
    console.log(error);
  }
});
