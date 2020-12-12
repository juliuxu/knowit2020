import { test, readInput } from '../utils/index';

type Line = string | '(' | ')';
type Input = Line[];

const prepareInput = (rawInput: string): Input => {
  return rawInput
    .replaceAll('(', ' ( ')
    .replaceAll(')', ' ) ')
    .split(' ')
    .filter((x) => x !== '');
};
const input = prepareInput(readInput());

const go = (input: Input) => {
  const generations: Record<number, string[]> = {};
  let i = 0;
  for (const token of input) {
    if (token === '(') {
      i += 1;
    } else if (token === ')') {
      i -= 1;
    } else {
      if (generations[i] === undefined) {
        generations[i] = [token];
      } else {
        generations[i].push(token);
      }
    }
  }

  const lengths = Object.values(generations).map((x) => x.length);

  return Math.max(...lengths);
};

/* Tests */

const t = `Alvor (Alv Alf Alvaro (Halfrid Halvar Halvard (Alvilde Alva (Alfie Alvor Joralv) Alfonse)) Calvin (Tjalve Alvbert Alvard))`;
test(go(prepareInput(t)), 6);

/* Results */

console.time('Time');
const result = go(input);
console.timeEnd('Time');

console.log('Solution:', result);
