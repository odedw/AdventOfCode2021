import { Board } from "./Board";

const input: string[] = require("./input.json");

const numbers = input[0].split(",").map((n) => parseInt(n));
let index = 1;
let boards: Board[] = [];
console.log("creating boards");
while (index < input.length) {
  boards.push(new Board(input.slice(index, index + 5)));
  index += 5;
}
boards[42].print();

console.log("running game");
for (let i = 0; i < input.length; i++) {
  const value = numbers[i];
  boards.forEach((b, index) => {
    if (b.done) return;
    if (b.mark(value)) {
      console.log(`${index} is winner! score is ${b.getScore(value)}`);
      // process.exit(0);
    }
  });
}
