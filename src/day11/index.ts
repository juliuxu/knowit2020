import { test, readInput, rotateLeft } from '../utils/index';

type Line = string;
type Input = Line[];

const prepareInput = (rawInput: string): Input => {
  return rawInput.split('\n');
};
const input = prepareInput(readInput());

const transform = (w: string) => {
  const aCode = 'a'.charCodeAt(0);
  const wCodes = w.split('').map((x) => x.charCodeAt(0) - aCode);
  const t = wCodes
    .slice(1)
    .map((x) => (x + 1) % 26)
    .map((x, i) => (x + wCodes[i]) % 26);

  const result = String.fromCharCode(...t.map((x) => x + aCode));
  return result;
};

const getTransformations = (w: string) => {
  const result = [w];
  let current = w;
  while (current.length > 1) {
    current = transform(current);
    result.push(current);
  }
  return result;
};

const go = (input: Input, pw = 'eamqia') => {
  for (const w of input) {
    const transformations = getTransformations(w);
    const square = transformations.map((x) =>
      x.padEnd(w.length, 'X').split('')
    );
    const rotated = rotateLeft(square).map((x) => x.join(''));
    for (const x of rotated) {
      if (x.includes(pw)) return w;
    }
  }
  return 'none';
};

/* Tests */

test(transform('juletre'), 'egqylw');
test(transform('egqylw'), 'lxpki');
test(transform('lxpki'), 'jnat');
test(transform('jnat'), 'xou');
test(transform('xou'), 'mj');
test(transform('mj'), 'w');

test(getTransformations('juletre'), [
  'juletre',
  'egqylw',
  'lxpki',
  'jnat',
  'xou',
  'mj',
  'w',
]);

test(
  rotateLeft([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]),
  [
    [3, 6, 9],
    [2, 5, 8],
    [1, 4, 7],
  ]
);

test(go(['juletre'], 'noj'), 'juletre');

/* Results */

console.time('Time');
const result = go(input);
console.timeEnd('Time');

console.log('Solution:', result);
