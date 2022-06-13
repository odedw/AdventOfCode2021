const input = require("./input.json");
let dots: string[] = input[0];
let folds: string[] = input[1];

function verticalFold(row: number, set: Set<String>) {
  // console.log(`=========================Vertical ${row}`);

  Array.from(set)
    .map((d) => d.split(",").map((i) => parseInt(i)))
    .filter((d) => d[1] > row)
    .forEach((d) => {
      set.delete(`${d[0]},${d[1]}`);
      set.add(`${d[0]},${row - (d[1] - row)}`);
      // console.log(`${d[0]},${d[1]} -> ${d[0]},${row - (d[1] - row)}`);
    });
}

function horizontalFold(col: number, set: Set<String>) {
  // console.log(`=========================Horizontal ${col}`);

  Array.from(set)
    .map((d) => d.split(",").map((i) => parseInt(i)))
    .filter((d) => d[0] > col)
    .forEach((d) => {
      set.delete(`${d[0]},${d[1]}`);
      set.add(`${col - (d[0] - col)},${d[1]}`);
      // console.log(`${d[0]},${d[1]} -> ${col - (d[0] - col)},${d[1]}`);
    });
}

// part 1
let dotSet = new Set(dots);

for (let i = 0; i < 1; i++) {
  const element = folds[i];
  const value = parseInt(element.split("=")[1]);
  if (element.startsWith("y")) {
    verticalFold(value, dotSet);
  } else {
    horizontalFold(value, dotSet);
  }
}
console.log(dotSet.size);

// part 2
for (let i = 0; i < folds.length; i++) {
  const element = folds[i];
  const value = parseInt(element.split("=")[1]);
  if (element.startsWith("y")) {
    verticalFold(value, dotSet);
  } else {
    horizontalFold(value, dotSet);
  }
}
const dotArray = Array.from(dotSet);
const maxCol = dotArray.map((d) => parseInt(d.split(",")[0])).sort((a, b) => a - b)[dotArray.length - 1];
const maxRow = dotArray.map((d) => parseInt(d.split(",")[1])).sort((a, b) => a - b)[dotArray.length - 1];
for (let row = 0; row <= maxRow; row++) {
  let rowStr = "";
  for (let col = 0; col <= maxCol; col++) {
    rowStr += dotSet.has(`${col},${row}`) ? "#" : "-";
  }
  console.log(rowStr);
}
