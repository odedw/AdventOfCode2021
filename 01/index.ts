const input = require("./input.json");
const GROUP_SIZE = 3;
let prev = Number.MAX_VALUE;
let counter = 0;
for (let i = 0; i < input.length; i++) {
  let sum = 0;
  for (let j = 0; j < GROUP_SIZE; j++) {
    if (i + j >= input.length) break;
    sum += input[i + j];
  }

  if (sum > prev) {
    counter++;
  }
  prev = sum;
}

console.log(counter);
