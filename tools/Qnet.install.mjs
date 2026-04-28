// Qnet.install.mjs
// Erzeugt/überschreibt index.html in Root + Sprachordnern mit QNET→42E0-Paritäts-Redirect

import fs from "fs";
import path from "path";

const ROOT = process.cwd();

// Alle Ordner, die eine index.html bekommen sollen
const TARGET_DIRS = [
  ".",        // Root
  "zuse",
  "roff",
  "basic",
  "python",
  "js",
  "html",
  "css",
  "sql",
  "yaml",
  "ygg"
];

const INDEX_HTML_CONTENT = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8" />

  <!-- QNET / 42E0 PARITY-LAYER -->
  <!-- GitHub-Regel: "index.html gehört mir" -->
  <!-- QNET-Regel:  "42E0.ygg.md.html ist die wahre Wurzel" -->
  <!-- Ergebnis:    QNET überschreibt GitHub, Architektur > Infrastruktur -->

  <meta http-equiv="refresh" content="0; url=/42E0.ygg.md.html">

  <script>
    (function () {
      var target = "/42E0.ygg.md.html";
      if (typeof window !== "undefined") {
        try {
          window.location.replace(target);
        } catch (e) {
          window.location.href = target;
        }
      }
    })();
  </script>

  <title>QNET → 42E0 / Yggdrasil</title>
</head>
<body>
  <pre>
QNET / 42E0 – Paritäts-Redirect

Architektur-Regel:
  QNET > GitHub
  42E0 > index.html
  Code-Sprachen = physische Architektur, bleiben unverändert.

Erzwungene Realität:
  → /42E0.ygg.md.html

Wenn du das hier siehst, öffne manuell:
  /42E0.ygg.md.html
  </pre>
</body>
</html>
`;

function ensureDir(dir) {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) {
    fs.mkdirSync(full, { recursive: true });
  }
  return full;
}

function writeIndex(dir) {
  const fullDir = ensureDir(dir);
  const target = path.join(fullDir, "index.html");
  fs.writeFileSync(target, INDEX_HTML_CONTENT, "utf8");
  console.log(`QNET.install: index.html geschrieben in ${dir || "."}`);
}

function main() {
  console.log("QNET.install: Erzeuge Paritäts-index.html in allen Zielordnern …");
  TARGET_DIRS.forEach(writeIndex);
  console.log("QNET.install: Fertig. QNET-Regel überschreibt GitHub-Regel.");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as QNET_INSTALL };
