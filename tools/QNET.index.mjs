// QNET.index.mjs
// Erzwingt index.html aus 42E0.ygg.md.html oder aus Yggdrasil()

import fs from "fs";
import { Yggdrasil } from "./QNET.ygg.mjs";

const SOURCE_HTML = "./42E0.ygg.md.html";
const TARGET_INDEX = "./index.html";

function generateIndexFromSource() {
  if (!fs.existsSync(SOURCE_HTML)) return false;
  const html = fs.readFileSync(SOURCE_HTML, "utf8");
  fs.writeFileSync(TARGET_INDEX, html);
  console.log("QNET.index: index.html aus 42E0.ygg.md.html erzeugt.");
  return true;
}

function generateIndexFromYgg() {
  const ygg = Yggdrasil();
  const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <title>QNET / 42E0 Yggdrasil</title>
  <style>
    body { background:#ffffff; color:#111; font-family: "Fira Code", monospace; padding:20px; }
    .node { border:1px solid #ddd; padding:8px 10px; margin:6px 0; }
    .id { color:#d60000; font-weight:bold; }
    .name { color:#0044cc; }
  </style>
</head>
<body>
<h1>QNET – 42E0 / Yggdrasil</h1>
<pre>Architektur → Infrastruktur (QNET steuert GitHub)</pre>
${Object.entries(ygg.branches).map(([id, n]) => `
<div class="node">
  <div class="id">${id}</div>
  <div class="name">${n.name}</div>
  <div>Sprache: ${n.lang}</div>
  <div>Links: ${(n.links || []).join(", ")}</div>
</div>
`).join("\n")}
</body>
</html>
`;
  fs.writeFileSync(TARGET_INDEX, html);
  console.log("QNET.index: index.html aus Yggdrasil() erzeugt.");
}

export function buildIndex() {
  if (!generateIndexFromSource()) {
    generateIndexFromYgg();
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  buildIndex();
}       
