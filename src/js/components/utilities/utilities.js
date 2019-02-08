import { config } from './../config'

function generateHash (length) {
  return Math.random().toString(36).slice(-length)
}

function logOut (output) {
  if (config.logging) {
    console.log(output)
  }
}

export const generateID = generateHash
export const log = logOut
