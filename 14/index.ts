const input: string[] = require("./input.json");
const initial: string = input[0];
const rules = input
  .slice(1)
  .map((str) => str.split(" -> "))
  .reduce((prev, curr) => {
    prev[curr[0]] = [`${curr[0].substring(0, 1)}${curr[1]}`, `${curr[1]}${curr[0].substring(1, 2)}`];
    return prev;
  }, {});

let pairCount = {};
for (let i = 0; i < initial.length - 1; i++) {
  const pair = initial.substring(i, i + 2);
  pairCount[pair] = pairCount[pair] ? pairCount[pair] + 1 : 1;
}

const STEPS = 40;
for (let i = 0; i < STEPS; i++) {
  console.log(`Finished step ${i+1}`)
  const newCount = {};
  Object.keys(pairCount).forEach((pair) => {
    const newPairs = rules[pair];
    newPairs.forEach((p) => {
      if (!newCount[p]) newCount[p] = 0;
      newCount[p] += pairCount[pair];
    });
  });
  pairCount = newCount;
}

const charCount = {};

Object.keys(pairCount).forEach((pair) => {
  if (!charCount[pair[0]]) charCount[pair[0]] = 0;
  if (!charCount[pair[1]]) charCount[pair[1]] = 0;
  charCount[pair[0]] += pairCount[pair];
  charCount[pair[1]] += pairCount[pair];
});
Object.keys(charCount).forEach((c) => (charCount[c] = Math.ceil(charCount[c] / 2)));
const sorted: any = Object.entries(charCount).sort((a: any, b: any) => a[1] - b[1]);
const result = sorted[sorted.length - 1][1] - sorted[0][1];
console.log(`=========================`);
console.log(result);
console.log(`=========================`);
