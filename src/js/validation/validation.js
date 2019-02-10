import { isValid } from 'date-fns'
import { log } from 'Js/utilities'
import { Validator, Rule } from '@cesium133/forgjs'

const historyValidator = new Rule({
  type: 'array'
})

const presetsValidator = new Rule({
  type: 'array'
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
}
