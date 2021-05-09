import 'core-js/es6/promise'
import 'core-js/es6/set'
import 'core-js/es6/map'
import * as yup from 'yup'

const streamItem = yup
  .object()
  .shape({
    id: yup.string().required(),
    streamName: yup.string().required(),
    dateAdded: yup
      .date()
      .transform(function (value, originalvalue) {
        if (typeof originalvalue !== 'string') {
          return originalvalue
        }
        return new Date(originalvalue)
      })
      .required()
  })
  .required()

const language = yup
  .object()
  .shape({
    value: yup.string().required(),
    label: yup.string().required(),
  })
  .required()

const historyValidator = yup
  .array()
  .of(streamItem)
  .required()

const favoritesValidator = yup
  .array()
  .of(streamItem)
  .required()

const presetsValidator = yup.array().of(
  yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    streams: yup
      .array()
      .of(streamItem)
      .required()
  })
)

const optionsValidator = yup.object().shape({
  chatVisible: yup.boolean().required(),
  menuVisible: yup.boolean().required(),
  navVisible: yup.boolean().required(),
  startMuted: yup.boolean().required(),
  chatLocation: yup.string().required(),
  currentLayout: yup
    .object()
    .shape({
      id: yup.string().required(),
      name: yup.string().required()
    })
    .required(),
  popularStreamLanguages: yup
    .array()
    .of(language).required()
})

// TODO - Clean up
export const validateHistory = async function (history) {
  try {
    return await historyValidator
      .validate(history)
      .then(function (value) {
        return true
      })
      .catch(function (err) {
        console.log(`${err.name}: ${err.errors}`)
        return false
      })
  } catch (error) {
    console.log(error)
    return false
  }
}

export const validatePresets = async function (presets) {
  try {
    return await presetsValidator
      .validate(presets)
      .then(function (value) {
        return true
      })
      .catch(function (err) {
        console.log(`${err.name}: ${err.errors}`)
        return false
      })
  } catch (error) {
    console.log(error)
    return false
  }
}

export const validateOptions = async function (options) {
  try {
    return await optionsValidator
      .validate(options)
      .then(function (value) {
        return true
      })
      .catch(function (err) {
        console.log(`${err.name}: ${err.errors}`)
        return false
      })
  } catch (error) {
    console.log(error)
    return false
  }
}

export const validateFavorites = async function (favorites) {
  try {
    return await favoritesValidator
      .validate(favorites)
      .then(function (value) {
        return true
      })
      .catch(function (err) {
        console.log(`${err.name}: ${err.errors}`)
        return false
      })
  } catch (error) {
    console.log(error)
    return false
  }
}
