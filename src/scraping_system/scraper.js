const puppeteer = require("puppeteer"); //Se carga la biblioteca de Puppeteer.
const formatter = require("../scraping_system/formatter.js"); // Se carga el formateador del JSON
const googlesheets = require("../scraping_system/googlesheets.js"); // Se carga el controlador de Google Sheet.

/**
 * Funcion asincrona que arranca el navegador para iniciar una busqueda.
 * @param {*} path 
 * @param {*} produ 
 * @returns el inicio del navegador
 */
async function startBrowser(path, produ) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            product: produ,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            executablePath: path,
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
        await page.waitForTimeout(5000);
        const isLogged = !(page._target._targetInfo.title).includes("llave");
        return isLogged;
    } catch (error) {
        console.log("Error en método LOGIN", error);
    }
}

/**
 * Función asíncrona que formatea los JSON, los adapta para googleshet y los la API de GoogleDocs.
 * @param {*} ids Los ids de los PVVC, para consultar su información.
 * @param {*} page La página donde se está trabajando, de puppeteer.
 */
async function uploadDataBase(ids, segundo, page, googleId) {
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
        return await googlesheets.addRowsGoogleSheet(rows, googleId);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Funcion asincrona que contiene todo el conjunto de instrucciones para obtener la informacion de los PVVC.
 * @param {*} url
 */
async function iniciarScrapping(page, username, password, googleId) {
    try {
        await login(page, username, password);

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

        return await uploadDataBase(claves, contenedor, page, googleId);
    } catch (error) {
        console.log('Scraping error: ' + error);
    } 
}

module.exports = {
    startBrowser: startBrowser,
    login: login,
    iniciarScrapping: iniciarScrapping
}