const fs = require('fs');

/**
 * Funcion que permite guardar el GoogleID en un archivo JSON.
 * @param {*} googleID 
 * @returns true si se creo exitoso, false si hubo error.
 */
const saveGoogleID = function (googleID) {
    try {
        const data = { "googleid": googleID };
        fs.writeFile('googleid.json', JSON.stringify(data), { flag: 'w+' }, (error) => {
            if (error) {
                console.error(error);
                return
              }
        });
        return true;
    } catch (error) {
        console.log('filehandler.savegoogleid: ' + error);
        return false;
    }
}

/**
 * Funcion que permite cargar los GoogleID contenidos en el archivo JSON.
 * @returns contenido del JSON
 */
const loadGoogleID = function () {
    try {
        return JSON.parse(fs.readFileSync('googleid.json'));
    } catch (error) {
        console.log('filehandler: ' + error);
        return false;
    }
}

module.exports = {
    saveGoogleID: saveGoogleID,
    loadGoogleID: loadGoogleID
}