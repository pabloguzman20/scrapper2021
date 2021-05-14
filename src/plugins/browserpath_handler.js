const getPath = function() {
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
  let tmpTwo = "";
  if (route.search("chrome") != -1) {
    tmpTwo = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  } else {
    tmpTwo = "C:\\Program Files\\Mozilla Firefox\\firefox.exe";
  }
  return tmpTwo;
};
let x = getPath();
console.log(x);
module.exports = {
  getPath: getPath,
};
