const input: string[] = require("./input.json");

const points: Record<string, number> = {};
const selected = new Set<string>();

function mark(i: number, j: number) {
  const prop = `${j},${i}`;
  // console.log(prop);
  if (!points[prop]) {
    points[prop] = 0;
  }

  if (++points[prop] == 2) selected.add(prop);
}
input
  .map((line) => line.split(",").map((i) => parseInt(i)))
  .forEach((s) => {
    // console.log(`=========================`);

    if (s[0] == s[2] || s[1] == s[3]) {
      for (let j = Math.min(s[0], s[2]); j <= Math.max(s[0], s[2]); j++) {
        for (let i = Math.min(s[1], s[3]); i <= Math.max(s[1], s[3]); i++) {
          mark(i, j);
        }
      }
    } else {
      let j = s[0];
      let i = s[1];
      while (j != s[2] && i != s[3]) {
        mark(i, j);
        s[0] > s[2] ? j-- : j++;
        s[1] > s[3] ? i-- : i++;
      }
      mark(s[3], s[2]);
    }
  });
console.log(selected.size);
