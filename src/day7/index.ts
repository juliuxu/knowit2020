import { test, readInput } from "../utils/index"

type Line = string;
type Input = Line[];

const prepareInput = (rawInput: string): Input => {
  return rawInput
    .split('\n')
    // Increase the world to avoid out of bounds errors
    .map(x => `  ${x}  `)
    .reverse()
}
const input = prepareInput(readInput())

// Assume only one branch can be missing
const isValidTree = (startX: number, input: Input) => {
  // Work our way up the tree
  for (let y = 1; y < input.length; y += 1) {
    // Assume non # means end of tree
    // EDIT: This assumption was wrong. Correct result when commented away
    // if (input[y][startX] !== '#') break;

    for (let x = 1; ; x += 1) {
      if (input[y][startX + x] !== input[y][startX - x]) return false
      if (
        input[y][startX + x] !== '#' &&
        input[y][startX + x + 1] !== '#' &&
        input[y][startX - x - 1] !== '#'
      ) break;
    }
  }
  return true;
}

const go = (input: Input) => {
  let validTrees = 0;
  for (let i = 0; i < input[0].length; i += 1) {
    if (input[0][i] === '#') {
      if (isValidTree(i, input)) validTrees += 1
    }
  }
  return validTrees
}


/* Tests */

// test()
const testT = prepareInput(readInput('testInput.txt'))
console.log(testT)
test(go(testT), 2)

/* Results */

console.time("Time")
const result = go(input)
console.timeEnd("Time")

console.log("Solution:", result)
