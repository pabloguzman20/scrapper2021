import puppeteer from 'puppeteer-core';

global.share.ipcMain.handle('puppeteer', async (event, args) => {
    const username = JSON.parse(args[0]);
    const password = JSON.parse(args[1]);
    let browser;
    try {
         browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: '/opt/google/chrome/google-chrome'
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0); //Se desactivan los errores por exceso de tiempo en carga.
    await page.goto('http://sifpvu.uabc.mx/pvvc/alumno/list_pvvc/');
    await page.click("#username");
    await page.keyboard.type(username);
    await page.click("#password");
    await page.keyboard.type(password);
    await page.click("#submit");
    await page.waitForNavigation();
    
    const isLogged = !(page._target._targetInfo.title).includes("llave");
    return isLogged;
  } catch (error) {
      console.log(error);
  } finally{
    await browser.close();
  }
});
