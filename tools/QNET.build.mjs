// QNET.build.mjs
// QNET-Pipeline: FORMEL, FUNCTION, YGG, INDEX

import { loadFormelMD, FORMEL } from "./QNET.formel.mjs";
import { loadFunctionMD, FUNCTION } from "./QNET.function.mjs";
import { Yggdrasil } from "./QNET.ygg.mjs";
import { buildIndex } from "./QNET.index.mjs";

export async function QNET_BUILD() {
  console.log("QNET.build: Starte Build-Pipeline …\n");

  console.log("1) FORMEL.md laden …");
  loadFormelMD();
  console.log("   FORMEL:", FORMEL, "\n");

  console.log("2) FUNCTION.md laden …");
  loadFunctionMD();
  console.log("   FUNCTION:", FUNCTION, "\n");

  console.log("3) Yggdrasil-Baum erzeugen …");
  const ygg = Yggdrasil();
  console.log("   Yggdrasil-Knoten:", Object.keys(ygg.branches).length, "\n");

  console.log("4) index.html erzwingen …");
  buildIndex();

  console.log("\nQNET.build: Fertig. Architektur → Infrastruktur ist durchgesetzt.");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  QNET_BUILD();
}
