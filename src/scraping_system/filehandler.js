var fs = require('fs');


const saveGoogleID = function (googleID) {
    const data = { "googleid": googleID };
    fs.writeFile('googleid.json', JSON.stringify(data), (error) =>{
        if (error) throw error;
        return true;
    });
    return true;
}

const loadGoogleID = function () {
    let googleid = fs.readFileSync('googleid.json');
    return JSON.parse(googleid);
}

module.exports = {
    saveGoogleID: saveGoogleID,
    loadGoogleID: loadGoogleID
}