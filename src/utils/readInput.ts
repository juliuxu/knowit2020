import { readFileSync } from "fs"
import * as getCallerFile from "get-caller-file"

export const readInput = (name = 'input.txt') => {
  const file = getCallerFile()
    .split("/")
    .slice(0, -1)
    .concat(name)
    .join("/")

  return readFileSync(file).toString()
}
