import { time } from "console";
import { test, readInput, range } from "../utils/index"

type Position = [number, number]
type Input = [Record<string, Position>, string[]];

const prepareInput = (rawInput: string, nLocations = 50): Input => {
  const locations = rawInput.split('\n')
    .slice(0, nLocations)
    .map(x => {
      const m = x.match(/^(.+): \((\d+), (\d+)\)$/)
      if (m === null) throw new Error(`unmatched '${x}'`)

      return [String(m[1]), [Number(m[2]), Number(m[3])]] as [string, Position]
    })
    .reduce((acc, x) => {
      acc[x[0]] = x[1]
      return acc;
    }, {})

  const route = rawInput.split('\n').slice(nLocations);
  return [locations, route]
}
const input = prepareInput(readInput())

const getDistance = ([x1, y1]: Position, [x2, y2]: Position) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

/*
For hver rute han reiser langs rutenettet går ett sekund for alle punktene i nettet
- men for de som er nærmere Nissen enn 50 ruter går det bare 0.75 sekunder,
for de som er nærmere enn 20 ruter går det 0.5 sekunder
og for de som er nærmere Nissen enn 5 ruter går det kun 0.25 sekunder.
Der han står går ikke tiden i det hele tatt.
 */
const timeMultiplier = (distance: number) => {
  if (distance === 0) return 0;
  if (distance < 5) return 0.25;
  if (distance < 20) return 0.5;
  if (distance < 50) return 0.75;
  return 1;
}

// Mutates the timeRecord
const elapseTime = (
  timeRecord: Record<string, number>,
  locations: Record<string, Position>,
  currentPosition: Position
) => {
  for (const [location, position] of Object.entries(locations)) {
    timeRecord[location] += 1 * timeMultiplier(getDistance(currentPosition, position))
  }
}

const getPath = ([x1, y1]: Position, [x2, y2]: Position): Position[] => {
  const xSign = x2 - x1 < 0 ? -1 : 1;
  const ySign = y2 - y1 < 0 ? -1 : 1;

  const xMoves = range(Math.abs(x2 - x1), 1).map(x => x * xSign)
  const yMoves = range(Math.abs(y2 - y1), 1).map(x => x * ySign)

  const xPath: Position[] = xMoves.map(xMove => [x1 + xMove, y1])
  const yPath: Position[] = yMoves.map(yMove => [x2, y1 + yMove])

  return [...xPath, ...yPath]
}

const go = ([locations, route]: Input) => {
  console.log(locations, route)
  const timeRecord: Record<string, number> = Object.keys(locations).reduce((acc, x) => {
    acc[x] = 0;
    return acc;
  }, {})

  const routePositions = route.map(destination => locations[destination])

  const completeRoute = routePositions.flatMap((nextPosition, i) => {
    const prevPosition = i === 0 ? [0, 0] as Position : routePositions[i - 1]
    const path = getPath(prevPosition, nextPosition)
    return path;
  })
  console.log('completeRoute', completeRoute)

  completeRoute.forEach(position => elapseTime(timeRecord, locations, position))

  const min = Math.min(...Object.values(timeRecord))
  const max = Math.max(...Object.values(timeRecord))
  console.log('timeRecord after', timeRecord)
  return max - min
}


/* Tests */
test(getDistance([0, 0], [1, 1]), 2)
test(getDistance([1, 1], [3, 4]), 5)

const t = `Nordpolen: (3, 4)
Rovaniemi: (1, 1)
Rovaniemi
Nordpolen`
test(go(prepareInput(t, 2)), 0.25)

/* Results */

console.time("Time")
const result = go(input)
console.timeEnd("Time")

console.log("Solution:", result)
