import { stringify } from "querystring";
import { test, readInput } from "../utils/index"

type Line = {};
type Input = number;

const exclude = 7;
const excludeStr = '7';

const prepareInput = (rawInput: string): Input => {
  return 5433000
  // return 10
}
const input = prepareInput(readInput())

function memo<T>(f: (args: number) => T): (args: number) => T {
  const d = {};
  return (args) => {
    if (!(args in d))
      d[args] = f(args)
    return d[args];
  }
}
const previousOdd = (n: number) => n % 2 === 0 ? n - 1 : n - 2;

const isPrime = memo((n: number) => {
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  for (let i = Math.ceil(Math.sqrt(n)); i > 2; i = previousOdd(i)) {
    if (n % i === 0) return false
  }
  return true;
})
const closestPrime = memo((n: number) => {
  if (n < 2) return NaN
  if (isPrime(n)) return n
  return closestPrime(previousOdd(n))
})

const go = (n: Input) => {
  let keptPackages = 0;
  let i = 0;
  while (i < n) {
    if (String(i).includes(excludeStr)) {
      const prime = closestPrime(i);
      // console.log(`pos(${i}): prime=${prime}`);
      i += prime + 1;
    } else {
      keptPackages += 1
      // console.log(`pos(${i}): keptPackages=${keptPackages}`);
      i += 1
    }
  }
  return keptPackages
}


/* Tests */
/*
For 10 pakker vil 7 bli levert. Pakkene med nr 0, 1, 2, 3, 4, 5 og 6.

For 20 pakker vil 9 bli levert. Pakkene med nr 0, 1, 2, 3, 4, 5, 6, 15, 16.

For 10 000 Pakker vil 32 bli levert.
*/
test(go(10), 7)
test(go(20), 9)
test(go(10000), 32)

/* Results */

console.time("Time")
const result = go(input)
console.timeEnd("Time")

console.log("Solution:", result)
