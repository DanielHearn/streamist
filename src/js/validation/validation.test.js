import {
  validateOptions,
  validateHistory,
  validatePresets,
  validateFavorites
} from './validation'

// Options Validator
test('expect options validator to validate on correct options', async () => {
  expect.assertions(1)

  const options = {
    chatVisible: true,
    menuVisible: true,
    navVisible: true,
    startMuted: false,
    chatLocation: 'right',
    currentLayout: {
      id: 'id',
      name: 'Grid'
    },
    popularStreamLanguages: [{
      "value": "en",
      "label": "English"
    }]
  }

  expect(await validateOptions(options)).toBe(true)
})

test('expect options validator to not validate on incorrect options', async () => {
  expect.assertions(1)

  const options = {
    chatVisible: 'true',
    menuVisible: 'true',
    startMuted: 'false',
    currentLayout: [2],
    popularStreamLanguages: 'test'
  }

  expect(await validateOptions(options)).toBe(false)
})

// History Validator
test('expect history validator to validate on correct history', async () => {
  expect.assertions(1)

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

  expect(await validateHistory(history)).toBe(true)
})

test('expect history validator to not validate on incorrect history', async () => {
  expect.assertions(1)

  const history = [
    {
      id: 5,
      streamName: false,
      dateAdded: 5
    },
    {
      id: 6,
      streamName: false,
      dateAdded: 5
    }
  ]

  expect(await validateHistory(history)).toBe(false)
})

// Favorites Validator
test('expect favorites validator to validate on correct favorites', async () => {
  expect.assertions(1)

  const favorites = [
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

  expect(await validateFavorites(favorites)).toBe(true)
})

test('expect favorites validator to not validate on incorrect favorites', async () => {
  expect.assertions(1)

  const favorites = [
    {
      id: 5,
      streamName: false,
      dateAdded: 5
    },
    {
      id: 6,
      streamName: false
    }
  ]

  expect(await validateFavorites(favorites)).toBe(false)
})

// Presets Validator
test('expect presets validator to validate on correct presets', async () => {
  expect.assertions(1)

  const presets = [
    {
      id: 'id',
      name: 'preset',
      streams: [
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
    },
    {
      id: 'id',
      name: 'preset',
      streams: [
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
    }
  ]

  expect(await validatePresets(presets)).toBe(true)
})

test('expect presets validator to not validate on incorrect presets', async () => {
  expect.assertions(1)

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

  expect(await validatePresets(presets)).toBe(false)
})
