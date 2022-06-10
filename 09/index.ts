import { parseMatrix } from "../utils";

let input: string[] = require("./input.json");

// preparation
const matrix = parseMatrix(input);

function getNeighbors(row: number, col: number): number[] {
  const coords = [
    { x: row - 1, y: col },
    { x: row + 1, y: col },
    { x: row, y: col - 1 },
    { x: row, y: col + 1 },
  ];
  const res = [];
  coords.forEach(({ x, y }) => {
    if (x >= 0 && y >= 0 && x < matrix.length && y < matrix[x].length) {
      res.push(matrix[x][y]);
    }
  });

  return res;
}

// part 1
// console.log(
//   matrix
//     .flatMap((row, i) => row.filter((cell, j) => getNeighbors(i, j).every((neighbor) => cell < neighbor)))
//     .reduce((prev, curr) => prev + curr + 1, 0)
// );

// part 2
// find all low points
const lowPoints = [];
matrix.forEach((row, i) =>
  row.forEach((cell, j) => {
    if (getNeighbors(i, j).every((neighbor) => cell < neighbor)) lowPoints.push({ x: j, y: i });
  })
);

// run BFS to find the basin from a particular point
function findBasin(x: number, y: number) {
  const visited = [];
  // console.log(`findBasin ${y},${x}`);
  const edges = [{ x, y }];
  while (edges.length > 0) {
    // console.log(`=========================`);

    const coord = edges.shift();
    if (visited.includes(`${coord.x}${coord.y}`)) continue;
    // console.log(`coord ${coord.y},${coord.x} = ${matrix[coord.y][coord.x]}`);
    visited.push(`${coord.x}${coord.y}`);
    [
      { x: coord.x - 1, y: coord.y },
      { x: coord.x + 1, y: coord.y },
      { x: coord.x, y: coord.y - 1 },
      { x: coord.x, y: coord.y + 1 },
    ]
      .filter((n) => n.x >= 0 && n.y >= 0 && n.y < matrix.length && n.x < matrix[n.y].length)
      .forEach((n) => {
        // console.log(`neighbor ${n.y},${n.x} = ${matrix[n.y][n.x]}`);
        // console.log(
        // !visited.includes(`${n.x}${n.y}`) && matrix[n.y][n.x] !== 9 && matrix[n.y][n.x] > matrix[coord.y][coord.x]
        // );
        if (
          !visited.includes(`${n.x}${n.y}`) && // have not been visited yet
          matrix[n.y][n.x] !== 9 &&
          matrix[n.y][n.x] > matrix[coord.y][coord.x] // larger than current cell
        ) {
          edges.push({ x: n.x, y: n.y });
        }
      });
    // console.log("edges", edges);
    // console.log("visited", visited);
    // console.log(`=========================`);
  }
  return visited;
}

// console.log(findBasin(lowPoints[1].x, lowPoints[1].y));
console.log(
  lowPoints
    .map((p) => findBasin(p.x, p.y).length)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((prev, curr) => prev * curr, 1)
);
