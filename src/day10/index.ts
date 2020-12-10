import { test, readInput } from '../utils/index';

type Line = string[];
type Input = Line[];

const prepareInput = (rawInput: string): Input => {
  return rawInput.split('\n').map((x) => x.split(','));
};
const input = prepareInput(readInput());

const getScoresForLine = (line: Line): Record<string, number> => {
  return line.reduce((acc, x, i) => {
    acc[x] = line.length - (i + 1);
    return acc;
  }, {});
};

const go = (input: Input) => {
  const scores = input.map(getScoresForLine);
  const totalScores = scores.reduce((acc, x) => {
    for (const [key, value] of Object.entries(x)) {
      acc[key] = (acc[key] ?? 0) + value;
    }
    return acc;
  }, {});

  let winner = ['', -1];
  for (const [key, value] of Object.entries(totalScores)) {
    if (value > winner[1]) winner = [key, value];
  }

  return `${winner[0]}-${winner[1]}`;
};

/* Tests */
const t = prepareInput(`ae,af,aa,ab,ad,ac
aa,ac,ab,ad,af,ae
ad,ae,ab,aa,af
ad,ac,aa,ab
af,ae,ab,aa,ac`);
test(go(t), 'ae-11');

/* Results */

console.time('Time');
const result = go(input);
console.timeEnd('Time');

console.log('Solution:', result);
