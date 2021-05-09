/**
 * Proyecto de Ingenieria de Software
 *
 * Catedratico: Dr. José Martin Olguin Espinoza
 * @author Hernan Castro Inzunza
 * @author Pablo Zeferino Guzmán Cortez
 */

const puppeteer = require("puppeteer"); //Se carga la biblioteca de Puppeteer.
const datos = require("../scraping_system/json/constantes.json"); //Se cargan los datos de la cuenta con la que se accede al sistema.
const formatter = require("../scraping_system/formatter.js"); // Se carga el formateador del JSON
const googlesheets = require("../scraping_system/googlesheets.js"); // Se carga el controlador de Google Sheet.
const url = "http://sifpvu.uabc.mx/pvvc/alumno/list_pvvc/";

/**
 * Funcion asincrona que arranca el navegador para iniciar una busqueda.
 * @returns {browser, page}
 */
async function startBrowser() {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            executablePath: '/opt/google/chrome/google-chrome'
          });
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0); //Se desactivan los errores por exceso de tiempo en carga.
        return { browser, page };
    } catch (error) {
        console.log(error);
    }
}

/**
 * Funcion asincrona que contiene las instrucciones para iniciar sesion en el sistema de autenticacion
 * de la UABC.
 * @param {*} page
 */
async function login(page, username, password) {
    try {
        await page.goto('http://sifpvu.uabc.mx/pvvc/alumno/list_pvvc/');
        await page.click("#username");
        await page.keyboard.type(username);
        await page.click("#password");
        await page.keyboard.type(password);
        await page.click("#submit");
        await page.waitForTimeout(7000);
        const isLogged = !(page._target._targetInfo.title).includes("llave");
        return isLogged; 
    } catch (error) {
        console.log(error);
    }
}

/**
 * Función asíncrona que formatea los JSON, los adapta para googleshet y los la API de GoogleDocs.
 * @param {*} ids Los ids de los PVVC, para consultar su información.
 * @param {*} page La página donde se está trabajando, de puppeteer.
 */
async function uploadDataBase(ids, segundo, page) {
    try {
        let rows = [];
        let contador = 0;
        for (let id of ids) {
            console.log("getting: " + id);
            await page.goto(
                "https://sifpvu.uabc.mx/pvvc/alumno/ver_solicitud_form/?idprog=" + id
            );

            const contenedor = await page.evaluate(() => {
                return JSON.parse(document.querySelector("body").innerText);
            });

            rows.push(formatter.formatMessage(contenedor, segundo[contador]));
            contador++;
        }
        console.log("PVVC length: " + rows.length);
        console.log("PVVC SUCCESS");
        await googlesheets.addRowsGoogleSheet(rows);
        console.log("GOOGLE SUCCESS");
    } catch (error) {
        console.log(error);
    }
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
        waitUntil: "load",
        timeout: 0,
    });

    await iniciarSesion(page);

    await page.waitForTimeout(7000);

    await page.goto(
        "https://sifpvu.uabc.mx/pvvc/responsablePVVC/getlistaTramitesAlumnoRFPVU/"
    );

    await page.waitForTimeout(1500);

    const contenedor = await page.evaluate(() => {
        return JSON.parse(document.querySelector("body").innerText);
    });
    let claves = [];
    for (let key in contenedor) {
        claves.push(parseInt(contenedor[key].idPVVC));
    }

    await uploadDataBase(claves, contenedor, page);

    await closeBrowser(browser);
}

/*
    Verifica si las credenciales de login son correctas
*/
const credentialsValidation = async function (username, password) {
    try {
        const { browser, page } = await startBrowser();


        await page.goto(url, {
            waitUntil: "load",
            timeout: 0,
        });

        await page.click("#username");
        await page.keyboard.type(username);
        await page.click("#password");
        await page.keyboard.type(password);
        await page.click("#submit");
        await page.waitForNavigation();
        
        const isLogged = !(page._target._targetInfo.title).includes("llave");
        await closeBrowser(browser);
        return isLogged;
    } catch (error) {
        console.log(error);
    } 
}


/**
 * Funcion asincrona que inicia el proceso de scraping.
(async () => {
    await iniciarScrapping(url, { waitUntil: "networkidle2" });
    process.exit(0);
})();
 */

module.exports = {
    startBrowser: startBrowser,
    login: login
}