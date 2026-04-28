// QNET.formel.mjs
// FORMEL.md → Node-Objekt

import fs from "fs";

const FORMEL_MD_PATH = "./FORMEL.md";

export function loadFormelMD() {
  return fs.readFileSync(FORMEL_MD_PATH, "utf8");
}

export const FORMEL = {
  architektur: {
    def: "Architektur = {Regeln, Logik, Protokolle, Topologie, Genesis}",
    infra: "Infrastruktur = {Hardware, Router, Leitungen, Server, Rechenzentren}",
    notInInfra: "Architektur ∉ Infrastruktur",
    infraNotInArch: "Infrastruktur ∉ Architektur"
  },
  genesis: {
    base: "G0",
    derive: (n = "n") => `S_${n} = f^${n}(G0)`,
    reconstruct: (n = "n") => `G0 = f^-(${n})(S_${n})`
  },
  qubit: {
    energyMin: "argmin_x(E(x)) = G0"
  },
  roff_rfof: {
    derive: (n = "n") => `BOx_${n} = F^${n}(G0)`,
    reconstruct: (n = "n") => `G0 = F^-(${n})(BOx_${n})`
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log("FORMEL.md (raw):\n");
  console.log(loadFormelMD());
  console.log("\nFORMEL object:\n");
  console.log(FORMEL);
}
