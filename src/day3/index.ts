import { test, readInput } from "../utils/index"

type Matrix = string[][];
type Input = [Matrix, string[]];

const prepareInput = (rawInput1: string, rawInput2: string): Input => {
  return [rawInput1.split('\n').map(x => x.split('')), rawInput2.split('\n')]
}
const input = prepareInput(readInput('input1.txt'), readInput('input2.txt'))


const directions: Record<string, [number, number]> = {
  left: [-1, 0],
  right: [1, 0],
  up: [0, -1],
  down: [0, 1],
  leftup: [-1, -1],
  leftdown: [-1, 1],
  rightup: [1, -1],
  rightdown: [1, 1],
}

const findWord2 = (matrix: Matrix, word: string, [x, y]: [number, number], [pX, pY]: [number, number]) => {
  if (word === '') return true;
  if (y < 0 || y >= matrix.length || x < 0 || x >= matrix[0].length) return false
  // console.log(`y(${y}) x(${x})`, word)

  if (matrix[y][x] === word.charAt(0)) {
    return findWord2(matrix, word.slice(1), [x + pX, y + pY], [pX, pY])
  }
  return false
}

const findWord = (matrix: Matrix, word: string) => {
  // console.log(matrix, `'${word}'`)
  for (let y = 0; y < matrix.length; y += 1) {
    // console.log(matrix[y])
    for (let x = 0; x < matrix[0].length; x += 1) {
      for (const direction of Object.values(directions)) {
        if (findWord2(matrix, word, [x, y], direction)) {
          console.log("found", word, `at line(${y}) col(${x})`)
          return true
        }
      }
    }
  }
  return false;
}

const go = ([matrix, words]: Input) => {
  return words.filter(word => !findWord(matrix, word)).slice().sort().join(',')
}


/* Tests */

// test()
const testInput = prepareInput(readInput('test1.txt'), readInput('test2.txt'))

test(findWord(testInput[0], testInput[1][0]), true)
test(findWord(testInput[0], 'langrennski'), true)
test(go(testInput), 'palmesøndag,påskeegg,smågodt')

/* Results */

console.time("Time")
const result = go(input)
console.timeEnd("Time")

console.log("Solution:", result)
