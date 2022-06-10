import { getNeighbors, parseMatrix, Point } from "../utils";

let input: string[] = require("./input.json");

function flash(p: Point): number {
  // console.log(`flash: ${p.y},${p.x}`);
  let sum = 1;
  matrix[p.y][p.x] = 0;
  let neighbors = getNeighbors(matrix, p.y, p.x);
  for (const n of neighbors) {
    if (matrix[n.y][n.x] !== 0) {
      // only increase if this one hasn't flashed yet
      matrix[n.y][n.x] += 1;
    }
  }
  for (const n of neighbors) {
    if (matrix[n.y][n.x] > 9) {
      sum += flash(n);
    }
  }
  return sum;
}

// part 1
let flashCount = 0;
const STEPS = 100;
let matrix = parseMatrix(input);

// for (let index = 0; index < STEPS; index++) {
//   for (let i = 0; i < matrix.length; i++) {
//     for (let j = 0; j < matrix[i].length; j++) {
//       matrix[i][j] += 1;
//     }
//   }
//   for (let i = 0; i < matrix.length; i++) {
//     for (let j = 0; j < matrix[i].length; j++) {
//       if (matrix[i][j] > 9) {
//         flashCount += flash(new Point(j, i));
//       }
//     }
//   }
// }

// matrix.forEach((row) => console.log(row.join("")));
// console.log(flashCount);

// part 2
matrix = parseMatrix(input);
flashCount = 0;
let iterations = 0;
do {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] += 1;
    }
  }
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] > 9) {
        flashCount = flash(new Point(j, i));
      }
    }
  }
  // console.log(flashCount, iterations);
  iterations++;
} while (flashCount != matrix.length * matrix[0].length);
matrix.forEach((row) => console.log(row.join("")));
console.log(iterations);
