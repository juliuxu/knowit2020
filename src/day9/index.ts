import { test, readInput, sum } from '../utils/index';

type Healthy = 0;
type Sick = 1;
type State = Healthy | Sick;
type Input = State[][];

type Position = [number, number];

const prepareInput = (rawInput: string): Input => {
  return rawInput
    .split('\n')
    .map((x) => x.split('').map((y) => (y === 'F' ? 0 : 1)));
};
const input = prepareInput(readInput());

const getNeighbours = ([x, y]: Position, input: Input) => {
  return [
    y + 1 < input.length && input[y + 1][x],
    y - 1 > -1 && input[y - 1][x],
    x + 1 < input[0].length && input[y][x + 1],
    x - 1 > -1 && input[y][x - 1],
  ].filter((x: State | false) => x !== false);
};

const tick = (input: Input) => {
  return input.map((row, y) =>
    row.map((column, x) =>
      column === 1 || sum(getNeighbours([x, y], input)) >= 2 ? 1 : 0
    )
  );
};

const getMatrixSum = (m: number[][]) => sum(m.map(sum));

const go = (input: Input) => {
  const inner = (m: Input, previousSum: number, day: number) => {
    const nextM = tick(m);
    const nextSum = getMatrixSum(nextM);
    if (previousSum === nextSum) return day;
    return inner(nextM, nextSum, day + 1);
  };
  return inner(input, getMatrixSum(input), 1);
};

/* Tests */

const t = `FFFSF
FSFFF
FSFSF
SFFSF
FSFFF`;
test(go(prepareInput(t)), 6);

/* Results */

console.time('Time');
const result = go(input);
console.timeEnd('Time');

console.log('Solution:', result);
