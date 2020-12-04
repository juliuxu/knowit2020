import { test, readInput } from "../utils/index"

/*
2 enheter sukker
3 enheter mel
3 enheter melk
1 enhet egg
*/

type Input = {
  sukker: number,
  mel: number,
  melk: number,
  egg: number,
};

const prepareInput = (rawInput: string): any => {
  const res: Input = {
    sukker: 0,
    mel: 0,
    melk: 0,
    egg: 0
  };
  const matches = rawInput.matchAll(/(\w+): (\d+)/g);
  for (const match of matches) {
    res[match[1]] += Number(match[2])
  }
  return res;
}
const input = prepareInput(readInput())

const go = (input: Input) => {
  console.log(input)

  const normalized = {
    sukker: Math.floor(input.sukker / 2),
    mel: Math.floor(input.mel / 3),
    melk: Math.floor(input.melk / 3),
    egg: Math.floor(input.egg / 1),
  }

  console.log(normalized)

  return Object.values(normalized).reduce((a, b) => Math.min(a, b))
}


/* Tests */

// test()

/* Results */

console.time("Time")
const result = go(input)
console.timeEnd("Time")

console.log("Solution:", result)
