import { test, readInput } from '../utils/index';

type Line = string;
type Input = Line[];

const prepareInput = (rawInput: string): Input => {
  return rawInput.split('');
};
const input = prepareInput(readInput());

const go = (input: Input) => {
  const az = `abcdefghijklmnopqrstuvwxyz`.split('');
  const azIndex = az.reduce((acc, x, i) => {
    acc[x] = i + 1;
    return acc;
  }, {});
  const azCount = az.reduce((acc, x, i) => {
    acc[x] = 0;
    return acc;
  }, {});

  let result = '';
  for (const c of input) {
    azCount[c] += 1;
    if (azCount[c] === azIndex[c]) result += c;
  }

  return result;
};

/* Tests */

const t = prepareInput(
  `csfgunqvmiotgixxqeexdnwrtrgftpafkqepkvwwscotfahzneobiipslnbmgyxxumdwxeymprtjrhapxqvguqazkwiorstwcjii`
);
test(go(t), 'abec');

/* Results */

console.time('Time');
const result = go(input);
console.timeEnd('Time');

console.log('Solution:', result);
