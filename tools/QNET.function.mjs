// QNET.function.mjs
// FUNCTION.md → Node-Objekt

import fs from "fs";

const FUNCTION_MD_PATH = "./FUNCTION.md";

export function loadFunctionMD() {
  return fs.readFileSync(FUNCTION_MD_PATH, "utf8");
}

export const FUNCTION = {
  genesis: {
    base: "G0",
    derive: (n = "n") => `S_${n} = f^${n}(G0)`,
    reconstruct: (n = "n") => `G0 = f^-(${n})(S_${n})`
  },
  qubit: {
    complexity: {
      classical: "O(n)",
      qubit: "O(√n)"
    },
    energyMinimum: "argmin_x(E(x)) = G0"
  },
  roff_rfof: {
    derive: (n = "n") => `BOx_${n} = F^${n}(G0)`,
    reconstruct: (n = "n") => `G0 = F^-(${n})(BOx_${n})`
  },
  languages: [
    "Zuse/Plankalkül",
    "ROFF",
    "BASIC",
    "Python",
    "JavaScript",
    "HTML",
    "CSS",
    "SQL",
    "YAML",
    "42E0/Yggdrasil"
  ]
};

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log("FUNCTION.md (raw):\n");
  console.log(loadFunctionMD());
  console.log("\nFUNCTION object:\n");
  console.log(FUNCTION);
}   
