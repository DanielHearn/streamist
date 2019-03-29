import {
  validateOptions,
  validateHistory,
  validatePresets,
  validateFavorites
} from './validation'

// Options Validator
test('expect options validator to validate on correct options', () => {
  const options = {
    chatVisible: true,
    menuVisible: true,
    startMuted: false,
    currentLayout: {
      id: 'id',
      name: 'Grid'
    }
  }

  expect(validateOptions(options)).toBe(true)
})

test('expect options validator to not validate on incorrect options', () => {
  const options = {
    chatVisible: 'true',
    menuVisible: 'true',
    startMuted: 'false',
    currentLayout: [2]
  }

  expect(validateOptions(options)).toBe(false)
})

// History Validator
test('expect history validator to validate on correct history', () => {
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

  expect(validateHistory(history)).toBe(true)
})

test('expect history validator to not validate on incorrect history', () => {
  const history = [
    {
      id: 2,
      streamName: true,
      dateAdded: 5
    },
    {
      id: 2,
      streamName: false,
      dateAdded: 5
    }
  ]

  expect(validateHistory(history)).toBe(false)
})

// Favorites Validator
test('expect favorites validator to validate on correct favorites', () => {
  const favorites = [
    {
      id: 'id',
      streamName: 'stream'
    },
    {
      id: 'id',
      streamName: 'stream'
    }
  ]

  expect(validateFavorites(favorites)).toBe(true)
})

test('expect favorites validator to not validate on incorrect favorites', () => {
  const favorites = [
    {
      id: 5,
      streamName: false
    },
    {
      id: 6,
      streamName: false
    }
  ]

  expect(validateFavorites(favorites)).toBe(false)
})

// Presets Validator
test('expect presets validator to validate on correct presets', () => {
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

  expect(validatePresets(presets)).toBe(true)
})

test('expect presets validator to not validate on incorrect presets', () => {
  const presets = [
    {
      id: 4,
      name: false,
      streams: {}
    },
    {
      id: false,
      name: 5,
      streams: 7
    }
  ]

  expect(validatePresets(presets)).toBe(false)
})
