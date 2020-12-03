import { test, readInput } from "../utils/index"

type Line = number;
type Input = Line[];

const prepareInput = (rawInput: string): Input => {
  return rawInput.split(',').map(x => Number(x))
}
const input = prepareInput(readInput())

const go = (input: Input) => {
  const sorted = input.slice().sort((a, b) => a - b)
  for (let i = 0; i < sorted.length; i += 1) {
    if (i + 1 !== sorted[i]) {
      return i + 1
    }
  }

  return 'none'
}


/* Tests */

// test()

/* Results */

console.time("Time")
const result = go(input)
console.timeEnd("Time")

console.log("Solution:", result)
