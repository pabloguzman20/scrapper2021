var fs = require('fs');

/**
 * Funcion que permite guardar el GoogleID en un archivo JSON.
 * @param {*} googleID 
 * @returns true si se creo exitoso, false si hubo error.
 */
const saveGoogleID = function (googleID) {
    const data = { "googleid": googleID };
    fs.writeFile('googleid.json', JSON.stringify(data), (error) =>{
        if (error) throw error;
        return true;
    });
    return true;
}

/**
 * Funcion que permite cargar los GoogleID contenidos en el archivo JSON.
 * @returns contenido del JSON
 */
const loadGoogleID = function () {
    let googleid = fs.readFileSync('googleid.json');
    
    return JSON.parse(googleid);
}

module.exports = {
    saveGoogleID: saveGoogleID,
    loadGoogleID: loadGoogleID
}