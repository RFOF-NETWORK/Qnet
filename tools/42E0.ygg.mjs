// 42E0.ygg.mjs
// Yggdrasil Meta-Baum für QNET
// Node-native Codesprache für die 42E0-Ebene

import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const NODES_DIR = path.join(process.cwd(), "nodes");

// Loader für alle .md-Knoten
function loadNodes() {
  const files = fs.readdirSync(NODES_DIR).filter(f => f.endsWith(".md"));

  return files.map(file => {
    const raw = fs.readFileSync(path.join(NODES_DIR, file), "utf8");
    const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

    const meta = yaml.load(match[1]);
    const body = match[2];

    return {
      id: meta.id,
      name: meta.name,
      lang: meta.lang,
      links: meta.links || [],
      body
    };
  });
}

// Yggdrasil-Baum erzeugen
export function Yggdrasil() {
  const nodes = loadNodes();

  const tree = {};
  for (const n of nodes) {
    tree[n.id] = {
      name: n.name,
      lang: n.lang,
      links: n.links
    };
  }

  return {
    genesis: tree["000"],
    branches: tree,
    meta: {
      version: "42E0",
      root: "Yggdrasil",
      description: "Meta-Baum aller QNET-Knoten"
    }
  };
}

// CLI-Ausgabe
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(JSON.stringify(Yggdrasil(), null, 2));
}       
