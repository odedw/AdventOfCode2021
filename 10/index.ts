let input: string[] = require("./input.json");

let score = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

let openers = ["{", "[", "<", "("];
let closers = ["}", "]", ">", ")"];

function removePairs(line: string): string {
  let str = line;
  let size = 0;
  do {
    size = str.length;
    str = str.split("[]").join("").split("()").join("").split("{}").join("").split("<>").join("");
  } while (size > str.length);
  return str;
}

// part 1
const sum = input
  .map((line) => removePairs(line)) // remove all matching paris
  .map((line) => line.split("")) //split to chars
  .map((chars) => chars.find((c) => closers.includes(c))) //find first unmatched closers
  .filter((c) => c !== undefined) // filter out incomplete lines
  .map((c) => score[c]) // calculate score for each line
  .reduce((prev, curr) => prev + curr, 0); // sum scores
console.log(sum);

// part 2
const score2 = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

function calculateScore(closers: string): number {
  return closers.split("").reduce((prev, curr) => prev * 5 + score2[curr], 0);
}
const scores = input
  .map((line) => removePairs(line))
  .filter((line) => line.split("").every((c) => !closers.includes(c)))
  .map((line) =>
    line
      .split("")
      .reverse()
      .map((c) => closers[openers.indexOf(c)])
      .join("")
  )
  .map((line) => calculateScore(line))
  .sort((a, b) => a - b);

console.log(scores[Math.floor(scores.length / 2)]);
