// FORMEL.mjs
// Lädt FORMEL.md und exportiert die Formeln als Node-Objekt

import fs from "fs";

export function loadFormelMD() {
  return fs.readFileSync("./FORMEL.md", "utf8");
}

export const FORMEL = {
  architektur: {
    def: "Architektur = {Regeln, Logik, Protokolle, Topologie, Genesis}",
    notInInfra: "Architektur ∉ Infrastruktur",
    infraNotInArch: "Infrastruktur ∉ Architektur"
  },
  genesis: {
    base: "G0",
    derive: (n) => `S_${n} = f^${n}(G0)`,
    reconstruct: (n) => `G0 = f^-(${n})(S_${n})`
  },
  qubit: {
    energyMin: "argmin_x(E(x)) = G0"
  },
  roff_rfof: {
    derive: (n) => `BOx_${n} = F^${n}(G0)`,
    reconstruct: (n) => `G0 = F^-(${n})(BOx_${n})`
  }
};

// CLI-Ausgabe
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log("FORMEL.mjs loaded:");
  console.log(FORMEL);
}
