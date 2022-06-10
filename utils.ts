export function parseMatrix(input: string[]): number[][] {
  return Array.from({ length: input.length }, (_, i) => input[i].split("").map((n) => parseInt(n)));
}

export class Point {
  x: number;
  y: number;
  constructor(x_, y_) {
    this.x = x_;
    this.y = y_;
  }

  toString(): string {
    return `${this.y},${this.x}`;
  }
}

export function getNeighbors<T>(matrix: T[][], row: number, col: number): Point[] {
  const neighbors = [];
  // console.log(`=========================`);
  // console.log(row, col);
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      // console.log(i, j);
      if (i < 0 || j < 0 || i >= matrix.length || j >= matrix[i].length || (i == row && j == col)) {
        continue;
      }
      neighbors.push(new Point(j, i));
    }
  }
  return neighbors;
}
