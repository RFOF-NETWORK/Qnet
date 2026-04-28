import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const NODES_DIR = path.join(process.cwd(), "nodes");

export function loadQnetNodes() {
  const files = fs.readdirSync(NODES_DIR).filter(f => f.endsWith(".md"));

  return files.map(file => {
    const raw = fs.readFileSync(path.join(NODES_DIR, file), "utf8");

    const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) throw new Error(`Invalid frontmatter in ${file}`);

    const meta = yaml.load(match[1]);
    const body = match[2];

    return {
      file,
      meta,
      body
    };
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const nodes = loadQnetNodes();
  console.log("Loaded Qnet Nodes:");
  nodes.forEach(n => console.log(`${n.meta.id} → ${n.meta.name}`));
}
