let fish: number[] = require("./input.json");
// const schools = [fish.slice(0, 5)];
const INITIAL = 6;
const schools = [[INITIAL]];
const DAYS = 10;
const MAX_SCHOOL_SIZE = 10;

function unfold(
  initial: number,
  iterations: number,
  startDelay: number = 2,
  spawnDelay: number = 6
) {
  let arr = [initial];
  for (let i = 0; i < iterations; i++) {
    let index = 0;
    let length = arr.length;
    while (index < length) {
      if (arr[index] > 0) {
        arr[index]--;
      } else {
        arr[index] = spawnDelay;
        arr.push(spawnDelay + startDelay);
      }
      index++;
    }
  }

  return arr;
}

// part 1
console.log(`========================= Part1`);
console.log(fish.reduce((prev, curr) => (prev += unfold(curr, 80).length), 0));

// part 2
console.log(`========================= Part 2`);

// step 1 - precompute each digit for 128 days
const precomputed128 = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(
  (f) => unfold(f, 128).length
);

// step 2 - precompute each digit for 256 days by coputing for 128 days, then iterating and using the precomputed128
const precomputed256 = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((f) =>
  unfold(f, 128).reduce((prev, curr) => (prev += precomputed128[curr]), 0)
);

// step 3 - calculate for input based on precomputed256
console.log(fish.reduce((prev, curr) => (prev += precomputed256[curr]), 0));
console.log(`=========================`);
