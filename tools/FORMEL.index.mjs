// FORMEL.index.mjs
// QNET FORMEL-NODE: Erzwingt 42E0.ygg.md.html als Startseite

import fs from "fs";

const SOURCE = "./42E0.ygg.md.html";
const TARGET = "./index.html";

function enforceIndex() {
  if (!fs.existsSync(SOURCE)) {
    throw new Error("42E0.ygg.md.html nicht gefunden!");
  }

  const html = fs.readFileSync(SOURCE, "utf8");
  fs.writeFileSync(TARGET, html);

  console.log("QNET FORMEL-NODE: index.html erfolgreich erzwungen.");
}

enforceIndex();
