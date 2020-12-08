import { test } from "./test"
import { readInput } from "./readInput"

export const sum = (numbers: number[]) => numbers.reduce((acc, x) => acc + x, 0)
export const multiply = (numbers: number[]) => numbers.reduce((acc, x) => acc * x, 1)

// https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
export function range(size: number, startAt: number = 0): ReadonlyArray<number> {
  return [...Array(size).keys()].map(i => i + startAt);
}

export function memo<A extends string, B>(f: (args: A) => B): (args: A) => B {
  const d: Record<string, B> = {};
  return (args: A) => {
    if (!(args in d)) d[args] = f(args);
    return d[args];
  }
}

export { test, readInput }
export default { test, readInput }
