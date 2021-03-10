const puppeteer = require("puppeteer"); //Se carga la biblioteca de Puppeteer.
const datos = require("./constantes"); //Se cargan los datos de la cuenta con la que se accede al sistema.
const username = "#username";
const password = "#password";

const url = "http://sifpvu.uabc.mx/pvvc/alumno/list_pvvc/";

/**
 * Funcion asincrona que arranca el navegador para iniciar una busqueda.
 * @returns {browser, page}
 * @author Pablo Guzman
 */
async function startBrowser() {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0); //Se desactivan los errores por exceso de tiempo en carga.
    return { browser, page };
}

/**
 * Funcion asincrona que termina el proceso del navegador.
 * @param {*} browser 
 * @returns Cierre de navegador
 * @author Pablo Guzman
 */
async function closeBrowser(browser) {
    return browser.close();
}

/**
 * Funcion asincrona que contiene las instrucciones para iniciar sesion en el sistema de autenticacion
 * de la UABC.
 * @param {*} page 
 * @author Pablo Guzman
 */
async function iniciarSesion(page) {
    await page.click(username);
    await page.keyboard.type(datos.username);
    await page.click(password);
    await page.keyboard.type(datos.password);
    await page.click("#submit");
}

/**
 * Funcion asincrona que tiene las instrucciones para cargar la tabla de los PVVC en el navegador.
 * @param {*} page 
 * @author Pablo Guzman
 */
async function cargarTablaPVVC(page) {
    await page.hover('.main-menu');
    await page.waitForTimeout(1000);
    await page.click("#menuPVVC");
    await page.hover('#menu_usuario_nav');
    await page.waitForTimeout(4000);
    await page.click("#new_sol");
}

/**
 * Funcion asincrona que contiene todo el conjunto de instrucciones para obtener la informacion de los PVVC.
 * @param {*} url 
 * @author Pablo Guzman
 */
async function iniciarScrapping(url) {
    const { browser, page } = await startBrowser();

    page.setViewport({ width: 800, height: 600 });

    await page.goto(url, {
        waitUntil: 'load',
        timeout: 0
    });

    await iniciarSesion(page);

    await page.waitForTimeout(7000);

    await cargarTablaPVVC(page);

    await page.waitForTimeout(3000);

    const temporalUno = await page.evaluate(() => {
        let rows = document.getElementsByTagName("table")[0].rows;
        let i = 1;
        let last = rows[rows.length - 1];
        let cell = last.cells[0];
        let array = [];
        while (i < rows.length) {
            last = rows[i];
            cell = last.cells[0];
            array.push(cell.innerHTML);
            i++;
        }
        return array;
    });

    await page.click(".pagination > li:nth-child(4) > a:nth-child(1)");

    await page.waitForTimeout(3000);

    const temporalDos = await page.evaluate(() => {
        let rows = document.getElementsByTagName("table")[0].rows;
        let i = 1;
        let last = rows[rows.length - 1];
        let cell = last.cells[0];
        let array = [];
        while (i < rows.length) {
            last = rows[i];
            cell = last.cells[0];
            array.push(cell.innerHTML);
            i++;
        }
        return array;
    });

    await page.click(".pagination > li:nth-child(6) > a:nth-child(1)");

    await page.waitForTimeout(3000);

    const temporalTres = await page.evaluate(() => {
        let rows = document.getElementsByTagName("table")[0].rows;
        let i = 1;
        let last = rows[rows.length - 1];
        let cell = last.cells[0];
        let array = [];
        while (i < rows.length) {
            last = rows[i];
            cell = last.cells[0];
            array.push(cell.innerHTML);
            i++;
        }
        return array;
    });

    console.log(temporalUno);
    console.log(temporalDos);
    console.log(temporalTres);

    closeBrowser(browser);
}

/**
 * Funcion asincrona que inicia el proceso de scraping.
 */
(async () => {
    await iniciarScrapping(url, { waitUntil: "networkidle2" });
    process.exit(0);
})();
