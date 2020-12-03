import { test, readInput } from "../utils/index"

type Line = {};
type Input = Line[];

const prepareInput = (rawInput: string): Input => {
  return rawInput.split('\n')
}
const input = prepareInput(readInput())

const go = (input: Input) => {
  return
}


/* Tests */

// test()

/* Results */

console.time("Time")
const result = go(input)
console.timeEnd("Time")

console.log("Solution:", result)
