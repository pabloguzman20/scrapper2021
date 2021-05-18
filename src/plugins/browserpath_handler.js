/**
 * Funcion que permite ejecuta QUERYS en la consola de Windows para obtener el ProgID
 * y el navegador que utiliza el cliente.
 * @returns la ruta ejecutable segun el navegador instalado.
 */
const getPath = function() {
  const execSync = require("child_process").execSync;
  const output = execSync(
    "reg QUERY HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\FileExts\\.html\\UserChoice\\",
    { encoding: "utf-8" }
  );
  if (output.search("ChromeHTML") != -1) {
    output = "ChromeHTML";
  } else {
    output = "FirefoxHTML";
  }
  const route = execSync(
    `reg QUERY HKEY_CLASSES_ROOT\\${output}\\shell\\open\\command`.replace(
      /(\r\n|\n|\r)/gm,
      ""
    ),
    { encoding: "utf-8" }
  );

  let tmpTwo = "";
  if (route.search("chrome") != -1) {
    tmpTwo = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  } else {
    tmpTwo = "C:\\Program Files\\Mozilla Firefox\\firefox.exe";
  }
  return tmpTwo;
};

module.exports = {
  getPath: getPath,
};
