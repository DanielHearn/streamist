import { config, defaultData } from 'Js/config'

export const generateID = function (length) {
  return Math.random().toString(36).slice(-length)
}

export const getDefault = function (field) {
  if (defaultData.hasOwnProperty(field)) {
    // Naive deepclone that won't clone functions
    return JSON.parse(JSON.stringify(defaultData[field]))
  } else {
    return undefined
  }
}

export const log = function (output) {
  if (config.logging) {
    console.log(output)
  }
}
