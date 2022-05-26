const input = require("./input.json");

let gamma = "";
let epsilon = "";

function part1() {
  let count = Array.from({ length: input[0].length }, () => 0);
  for (let index = 0; index < input.length; index++) {
    const element = input[index].split("").map(parseInt);
    element.forEach((n, i) => (count[i] += n));
  }

  count.forEach((n, i) => {
    gamma += n > input.length / 2 ? "1" : "0";
    epsilon += n > input.length / 2 ? "0" : "1";
  });

  console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));
}

function findMostCommonBit(index: number, input: string[]): string {
  let count = input.reduce(
    (prev, curr) => (prev += parseInt(curr.charAt(index))),
    0
  );
  return count >= input.length / 2 ? "1" : "0";
}

function part2() {
  let values = [...input];
  let index = 0;
  while (values.length > 1) {
    let bit = findMostCommonBit(index, values);
    values = values.filter((v) => v.charAt(index) == bit);
    index++;
  }

  let oxygen = values[0];

  values = [...input];
  index = 0;
  while (values.length > 1) {
    let bit = findMostCommonBit(index, values);
    values = values.filter((v) => v.charAt(index) != bit);
    index++;
  }

  let CO2 = values[0];
  console.log(parseInt(oxygen, 2) * parseInt(CO2, 2));
}
