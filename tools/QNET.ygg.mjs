// QNET.ygg.mjs
// nodes/*.md → Yggdrasil-Meta-Baum

import fs from "fs";
import path from "path";

const NODES_DIR = "./nodes";

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const fm = match[1];
  const body = match[2];

  const meta = {};
  fm.split("\n").forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const [key, ...rest] = trimmed.split(":");
    const value = rest.join(":").trim();
    if (key === "links") {
      // links:
      //   - 010
      //   - 020
      const links = [];
      fm.split("\n").forEach(l => {
        const t = l.trim();
        if (t.startsWith("- ")) {
          links.push(t.replace("- ", "").trim());
        }
      });
      meta.links = links;
    } else {
      meta[key.trim()] = value;
    }
  });

  return { meta, body };
}

export function loadYggNodes() {
  const files = fs.readdirSync(NODES_DIR).filter(f => f.endsWith(".md"));
  const nodes = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(NODES_DIR, file), "utf8");
    const { meta, body } = parseFrontmatter(raw);
    nodes.push({
      file,
      id: meta.id || file,
      name: meta.name || file,
      lang: meta.lang || "unknown",
      links: meta.links || [],
      body
    });
  }

  return nodes;
}

export function Yggdrasil() {
  const nodes = loadYggNodes();
  const branches = {};

  for (const n of nodes) {
    branches[n.id] = {
      name: n.name,
      lang: n.lang,
      links: n.links
    };
  }

  return {
    meta: {
      version: "42E0",
      root: "Yggdrasil",
      description: "Meta-Baum aller QNET-Knoten"
    },
    branches
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(JSON.stringify(Yggdrasil(), null, 2));
}
