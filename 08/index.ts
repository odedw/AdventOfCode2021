let input: string[] = require("./input.json");

// console.log(
//   `Part 1 - ${
//     input
//       .flatMap((str) => str.split(" | ")[1].split(" "))
//       .filter((str) => str.length <= 4 || str.length == 7).length
//   }`
// );

function contains(a: string, b: string): boolean {
  return b.split("").every((c) => a.indexOf(c) !== -1);
}

function resolveMapping(entries: string[]): Record<string, number> {
  const mapping = {};
  // const sorted = entries.map((e) => e.split("").sort().join(""));
  const one = entries.find((e) => e.length === 2);
  const seven = entries.find((e) => e.length === 3);
  const four = entries.find((e) => e.length === 4);
  const eight = entries.find((e) => e.length === 7);
  const sixSegment = entries.filter((e) => e.length === 6);
  const fiveSegment = entries.filter((e) => e.length === 5);

  // nine is the only six segment digit that fully contains all segments of 4
  const nine = sixSegment.find((e) => contains(e, four));

  // except for 9, only 0 has six segments and fully contains 1
  const zero = sixSegment.find((e) => e !== nine && contains(e, one));

  // 6 is the last six segment digit
  const six = sixSegment.find((e) => e != zero && e !== nine);

  // 2 is the only five segment digit that is not fully contained in 9
  const two = fiveSegment.find((e) => !contains(nine, e));

  // 5 is the only five segment digit that is fully contained in 6
  const five = fiveSegment.find((e) => contains(six, e));

  // 3 is the last five segment digit
  const three = fiveSegment.find((e) => e !== two && e != five);

  return {
    [zero]: 0,
    [one]: 1,
    [two]: 2,
    [three]: 3,
    [four]: 4,
    [five]: 5,
    [six]: 6,
    [seven]: 7,
    [eight]: 8,
    [nine]: 9,
  };
}

function decypherLine(line: string): number {
  const tokens = line.split(" | ");
  const entries = tokens[0].split(" ").map((e) => e.split("").sort().join(""));
  const digits = tokens[1].split(" ").map((e) => e.split("").sort().join(""));
  const mapping = resolveMapping(entries);
  const number = digits.map((d) => mapping[d].toString()).join("");
  return parseInt(number);
}

console.log(
  `Part 2 - ${input.reduce((prev, curr) => (prev += decypherLine(curr)), 0)}`
);
