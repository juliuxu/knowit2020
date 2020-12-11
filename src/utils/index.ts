import { test } from './test';
import { readInput } from './readInput';

export const sum = (numbers: number[]) =>
  numbers.reduce((acc, x) => acc + x, 0);
export const multiply = (numbers: number[]) =>
  numbers.reduce((acc, x) => acc * x, 1);

// https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
export function range(
  size: number,
  startAt: number = 0
): ReadonlyArray<number> {
  return [...Array(size).keys()].map((i) => i + startAt);
}

export function memo<A extends string, B>(f: (args: A) => B): (args: A) => B {
  const d: Record<string, B> = {};
  return (args: A) => {
    if (!(args in d)) d[args] = f(args);
    return d[args];
  };
}

export function max<T>(values: T[], compare: (a: T, b: T) => number) {
  return values.reduce((a, b) => (compare(a, b) === 1 ? a : b));
}

export function rotateLeft<T>(square: T[][]) {
  const newSquare = Object.keys(Array(square.length).fill('')).map(() =>
    Array(square.length).fill('')
  );
  const size = square.length;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      // Rotates clockwise 90d
      //newSquare[x][size - 1 - y] = square[y][x];

      // Roates counter-clockwise 90d
      newSquare[y][x] = square[x][size - 1 - y];
    }
  }
  return newSquare as T[][];
}

export { test, readInput };
export default { test, readInput };
