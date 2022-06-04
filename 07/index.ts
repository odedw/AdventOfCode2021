let positions: number[] = require("./input.json");

const min = positions.reduce(
  (prev, curr) => (prev = prev < curr ? prev : curr),
  positions[0]
);
const max = positions.reduce(
  (prev, curr) => (prev = prev > curr ? prev : curr),
  positions[0]
);

function calcCost(a, b): number {
  let sum = 0;
  for (let i = 1; i <= Math.abs(a - b); i++) {
    sum += i;
  }
  return sum;
}
let best = -1;
let bestFuel = -1;
for (let i = min; i < max; i++) {
  let fuel = 0;
  for (let j = 0; j < positions.length; j++) {
    const element = positions[j];
    // const cost = Math.abs(element - i); // part 1
    const cost = calcCost(element, i); // part 2
    fuel += cost;
  }
  if (fuel < bestFuel || bestFuel === -1) {
    bestFuel = fuel;
    best = i;
  }
}

console.log(best, bestFuel);
