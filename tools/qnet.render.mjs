import fs from "fs";
import path from "path";
import { loadQnetNodes } from "./qnet.build.mjs";

export function renderQnetHTML(output = "QNET.html") {
  const nodes = loadQnetNodes();

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>QNET</title>
<style>
  body { font-family: monospace; background: #fff; padding: 20px; }
  .node { border: 1px solid #ddd; padding: 12px; margin: 12px 0; }
  .id { color: #d60000; font-weight: bold; }
  .name { color: #0044cc; }
  .links { margin-top: 6px; }
</style>
</head>
<body>
<h1>QNET – Node Übersicht</h1>

${nodes.map(n => `
<div class="node">
  <div class="id">ID: ${n.meta.id}</div>
  <div class="name">${n.meta.name}</div>
  <div>Sprache: ${n.meta.lang}</div>
  <div class="links">Links: ${(n.meta.links || []).join(", ")}</div>
</div>
`).join("\n")}

</body>
</html>
`;

  fs.writeFileSync(output, html);
  return output;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const file = renderQnetHTML();
  console.log("Rendered:", file);
}
