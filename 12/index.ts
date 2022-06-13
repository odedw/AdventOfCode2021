let input: string[] = require("./input.json");

const graph: Record<string, string[]> = {};
input.forEach((edge) => {
  const nodes = edge.split("-");
  if (!graph[nodes[0]]) {
    graph[nodes[0]] = [];
  }
  if (!graph[nodes[0]].includes(nodes[1])) {
    graph[nodes[0]].push(nodes[1]);
  }
  if (!graph[nodes[1]]) {
    graph[nodes[1]] = [];
  }
  if (!graph[nodes[1]].includes(nodes[0])) {
    graph[nodes[1]].push(nodes[0]);
  }
});

// console.log(graph);
// part 1
function isSmallCave(node: string): boolean {
  return node.toLowerCase() === node;
}

function findAllPaths(node: string, path: string): string[] {
  const paths = [path];
  if (node === "end") return paths;
  const tokens = path.split(",");
  return graph[node]
    .filter((n) => !isSmallCave(n) || !tokens.includes(n)) // filter visited small caves
    .filter((n) => path.indexOf(`${node},${n}`) === -1)
    .flatMap((n) => findAllPaths(n, `${path},${n}`));
}

// let paths = findAllPaths("start", "start");
// console.log(paths);
// console.log(paths.length);

// part 2
function canVisit(path: string, node: string): boolean {
  const tokens = path.split(",");
  const smallCaveVisitedTwice = Object.values(
    tokens
      .filter((n) => isSmallCave(n))
      .reduce((prev, curr) => {
        prev[curr] = !prev[curr] ? 1 : prev[curr] + 1;
        return prev;
      }, {})
  ).some((count) => count > 1);
  return (
    node === "end" || // end of path or
    !isSmallCave(node) || // not a small cave or
    !tokens.includes(node) || // it's a small cave we haven't visited yet or
    !smallCaveVisitedTwice // small cave we visited once and no small cave have been visited twice yet
  );
}

function findAllPaths2(path: string): string[] {
  const tokens = path.split(",");
  const node = tokens[tokens.length - 1];
  const paths = [path];
  if (node === "end") return paths;
  return graph[node].filter((n) => n !== "start" && canVisit(path, n)).flatMap((n) => findAllPaths2(`${path},${n}`));
}

const paths = findAllPaths2("start");
// console.log(paths);
console.log(paths.length);
