/**
 * Funcion que permite ejecuta QUERYS en la consola de Windows para obtener el ProgID
 * y el navegador que utiliza el cliente.
 * @returns la ruta ejecutable segun el navegador instalado.
 */
const getPath = function() {
  const execSync = require("child_process").execSync;

  // Get navegador predeterminado
  const output = execSync(
    "reg QUERY HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\FileExts\\.html\\UserChoice\\",
    { encoding: "utf-8" }
  );

  // Get ruta del navegador predeterminado
  const route = execSync(
    `reg QUERY HKEY_CLASSES_ROOT\\${output.split(' ')[12].trim()}\\shell\\open\\command`.replace(
      /(\r\n|\n|\r)/gm,
      ""
    ),
    { encoding: "utf-8" }
  ).split(`"`)[1].trim();

  return route;
};

module.exports = {
  getPath: getPath,
};
