const scraper = require("../scraping_system/scraper.js");
const filehandler = require("../scraping_system/filehandler.js");
const gs = require("../scraping_system/googlesheets.js");
const routes = require("./browserpath_handler.js");

let username = "";
let password = "";
let path = "";
let product = "";
let googleId = "";
/**
 * Comunicación entre vista renderizada y el proceso principal, permite validar el login.
 */
global.share.ipcMain.handle("login", async (event, args) => {
  username = JSON.parse(args[0]);
  password = JSON.parse(args[1]);
  const ubuntu = true;
  if (ubuntu) {
    product = "chrome";
    path = routes.getPathUbuntu();
  } else {
    product = "chrome";
    path = routes.getPath();
  }

  const { browser, page } = await scraper.startBrowser(path, product);
  try {
    const isLogged = await scraper.login(page, username, password);
    return isLogged;
  } catch (error) {
    console.log("Error en mainprocess, login: ", error);
  } finally {
    await browser.close();
  }
});

/**
 * Comunicacion entre la vista renderizada y el proceso principal, permite ejecutar el scrapper.
 */
global.share.ipcMain.handle("scrap", async (event, args) => {
  const { browser, page } = await scraper.startBrowser(path, product);
  try {
    return await scraper.iniciarScrapping(page, username, password, googleId);
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
    let googleidObject = filehandler.loadGoogleID();
    if (googleidObject.googleid) {
      console.log(googleidObject);
      googleId = googleidObject.googleid;
      return googleId;
    }
    return false;
  } catch (error) {
    console.log(error.toString());
    return false;
  }
});

/**
 * Comunicacion entre la vista renderizada y el proceso principal, permite guardar el GoogleID en un JSON.
 */
global.share.ipcMain.handle("saveGoogleId", async (event, args) => {
  if (args) {
    googleId = JSON.parse(args[0]);
  }
  try {
    return filehandler.saveGoogleID(googleId);
  } catch (error) {
    console.log(error);
  }
});

global.share.ipcMain.handle("checkAuthGoogleService", async (event, args) => {
  if (args) {
    googleId = JSON.parse(args[0]);
  }
  try {
    const msg = await gs.authGoogleService(googleId);
    return msg;
  } catch (error) {
    console.log(error);
  }
});
