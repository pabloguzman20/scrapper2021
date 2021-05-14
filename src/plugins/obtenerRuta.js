const obtenerRuta = function() {
  const execSync = require("child_process").execSync;
  const output = execSync(
    "reg QUERY HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\FileExts\\.html\\UserChoice\\",
    { encoding: "utf-8" }
  ); 
  let tmp = output.toString().slice(158, 190);
  const route = execSync(
    `reg QUERY HKEY_CLASSES_ROOT\\${tmp}\\shell\\open\\command`.replace(
      /(\r\n|\n|\r)/gm,
      ""
    ),
    { encoding: "utf-8" }
  );
  let tmpTwo = route.slice(104, 148);
  return tmpTwo;
};

module.exports = {
  obtenerRuta: obtenerRuta,
};
