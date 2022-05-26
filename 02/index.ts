const input = require("./input.json");

let depth = 0;
let horizontal = 0;
let aim = 0;
for (let index = 0; index < input.length; index++) {
  const instruction = input[index];
  const tokens = instruction.split(" ");
  const val = parseInt(tokens[1]);
  if (tokens.length != 2) continue;
  if (tokens[0] == "forward") {
    horizontal += val;
    depth += aim * val;
  } else if (tokens[0] == "up") {
    aim -= val;
  } else if (tokens[0] == "down") {
    aim += val;
  }
}

console.log(depth * horizontal);
