import { test, readInput, memo } from '../utils/index';

type Line = {};
type Input = number;

const prepareInput = (rawInput: string): Input => 1800813;
const input = prepareInput(readInput());

const isPrime = (n: number) => {
  if (n === 2) return true;
  if (n % 2 === 0 || n < 2) return false;

  for (let i = 3; i < Math.sqrt(n) + 1; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
};

const go = (n: Input) => {
  // 1 sec vs 7s runtime when pre allocating the array
  // const chain = [0, 1];
  const chainSet = { 0: true, 1: true };
  const chain = Array(n);
  chain[0] = 0;
  chain[1] = 1;

  for (let i = 2; i < n; i += 1) {
    let res = chain[i - 2] - i;
    if (res < 0 || res in chainSet) {
      res = chain[i - 2] + i;
    }
    // .push is much faster on a preallocated array than assignment
    // chain[i] = res;
    chain.push(res);
    chainSet[res] = true;
  }

  console.log('chain generated', chain.length);
  console.log(chain.slice(0, 20));

  return chain.filter(isPrime).length;
};

/* Tests */

// test()

/* Results */

console.time('Time');
const result = go(input);
console.timeEnd('Time');

console.log('Solution:', result);
