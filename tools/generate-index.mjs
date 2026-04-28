// generate-index.mjs
// 42E0 erzeugt die Infrastruktur-Datei index.html

import fs from "fs";

const source = "./42E0.ygg.md.html";
const target = "./index.html";

const html = fs.readFileSync(source, "utf8");
fs.writeFileSync(target, html);

console.log("42E0 → index.html erzeugt");
