import { isValid } from 'date-fns'
import { log } from 'Js/utilities'
import { Validator, Rule } from '@cesium133/forgjs'

function isValidDate (date) {
  return isValid(new Date(date))
}

const historyItemValidator = new Validator({
  id: new Rule('string'),
  streamName: new Rule('string'),
  dateAdded: new Rule({
    type: 'string',
    custom: isValidDate
  })
})

const historyValidator = new Rule({
  type: 'array',
  of: historyItemValidator
})

const presetValidator = new Validator({
  id: new Rule('string'),
  name: new Rule('string'),
  streams: new Rule({
    type: 'array',
    of: new Rule('string')
  })
})

const presetsValidator = new Rule({
  type: 'array',
  of: presetValidator
})

const optionsValidator = new Validator({
  chatVisible: new Rule({ type: 'boolean' }),
  menuVisible: new Rule({ type: 'boolean' }),
  startMuted: new Rule({ type: 'boolean' }),
  currentLayout: {
    id: new Rule('string'),
    name: new Rule('string')
  }
})

const testOptionsValidator = function () {
  const options = {
    chatVisible: true,
    menuVisible: true,
    startMuted: false,
    currentLayout: {
      id: 'id',
      name: 'Grid'
    }
  }
  try {
    log(`Options test validation: ${optionsValidator.test(options)}`)
  } catch (error) {
    console.log(error)
  }
}

const testHistoryValidator = function () {
  const history = [
    {
      id: 'id',
      streamName: 'stream',
      dateAdded: 'Wed Feb 27 2019 21:33:28 GMT+0000'
    },
    {
      id: 'id',
      streamName: 'stream',
      dateAdded: 'Wed Feb 27 2019 21:33:28 GMT+0000'
    }
  ]
  try {
    log(`History test validation: ${historyValidator.test(history)}`)
  } catch (error) {
    console.log(error)
  }
}

const testPresetValidator = function () {
  const presets = [
    {
      id: 'id',
      name: 'preset',
      streams: ['stream', 'stream']
    },
    {
      id: 'id',
      name: 'preset',
      streams: ['stream', 'stream']
    }
  ]
  try {
    log(`Presets test validation: ${presetsValidator.test(presets)}`)
  } catch (error) {
    console.log(error)
  }
}

export const validateHistory = function (history) {
  return historyValidator.test(history)
}

export const validatePresets = function (presets) {
  return presetsValidator.test(presets)
}

export const validateOptions = function (options) {
  return optionsValidator.test(options)
}

export const testValidators = function () {
  testOptionsValidator()
  testHistoryValidator()
  testPresetValidator()
}
