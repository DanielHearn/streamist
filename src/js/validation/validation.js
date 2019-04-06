import { isValid } from 'date-fns'
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

const favoriteItemValidator = new Validator({
  id: new Rule('string'),
  streamName: new Rule('string')
})

const favoritesValidator = new Rule({
  type: 'array',
  of: favoriteItemValidator
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

export const validateHistory = function (history) {
  return historyValidator.test(history)
}

export const validatePresets = function (presets) {
  return presetsValidator.test(presets)
}

export const validateOptions = function (options) {
  return optionsValidator.test(options)
}

export const validateFavorites = function (favorites) {
  return favoritesValidator.test(favorites)
}