import { loadQnetNodes } from "./qnet.build.mjs";

export function buildQnetGraph() {
  const nodes = loadQnetNodes();

  const graph = {};
  for (const n of nodes) {
    graph[n.meta.id] = {
      name: n.meta.name,
      links: n.meta.links || []
    };
  }
  return graph;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const graph = buildQnetGraph();
  console.log("Qnet Graph:");
  console.log(JSON.stringify(graph, null, 2));
}
