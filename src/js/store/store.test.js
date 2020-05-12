import { mutations } from './store'
import { defaultData } from './../config'

const {
  setSmallInterface,
  setTopStreams,
  setTwitchGameInfo,
  addStream,
  removeStream,
  setStreams,
  setOptions,
  addStreamToHistory,
  setHistory,
  addStreamToFavorites,
  removeStreamFromFavorites,
  setFavorites,
  setPresets,
  addPresetToPresets,
  removePresetFromPresets,
  updatePreset
} = mutations

test('set smallInterface to true', () => {
  const state = _.cloneDeep(defaultData)

  setSmallInterface(state, true)

  expect(state.smallInterface).toEqual(true)
})

test('set smallInterface to false', () => {
  const state = _.cloneDeep(defaultData)

  setSmallInterface(state, false)

  expect(state.smallInterface).toEqual(false)
})

test('set topStreams', () => {
  const state = _.cloneDeep(defaultData)
  const topStreams = [
    {
      id: '34057836560',
      user_id: '36029255',
      user_name: 'Riot Games',
      game_id: '21779',
      community_ids: ['ad14d4fc-1a7c-413f-aa32-4906ef3669ae'],
      type: 'live',
      title: 'MSI Groups: G2 Esports vs. SK telecom T1',
      viewer_count: 159654,
      started_at: '2019-05-10T08:30:02Z',
      language: 'en',
      thumbnail_url:
        'https://static-cdn.jtvnw.net/previews-ttv/live_user_riotgames-{width}x{height}.jpg',
      tag_ids: ['6ea6bca4-4712-4ab9-a906-e3336a9d8039'],
      thumbnail:
        'https://static-cdn.jtvnw.net/previews-ttv/live_user_riotgames-480x270.jpg',
      clean_username: 'riotgames',
      url: 'https://twitch.tv/riotgames',
      game_name: 'League of Legends'
    },
    {
      id: '34058057440',
      user_id: '190835892',
      user_name: 'LCK_Korea',
      game_id: '21779',
      community_ids: [],
      type: 'live',
      title: 'Group Stage Day 1 | 2019 Mid-Season Invitational',
      viewer_count: 70705,
      started_at: '2019-05-10T09:20:21Z',
      language: 'ko',
      thumbnail_url:
        'https://static-cdn.jtvnw.net/previews-ttv/live_user_lck_korea-{width}x{height}.jpg',
      tag_ids: ['ab2975e3-b9ca-4b1a-a93e-fb61a5d5c3a4'],
      thumbnail:
        'https://static-cdn.jtvnw.net/previews-ttv/live_user_lck_korea-480x270.jpg',
      clean_username: 'lck_korea',
      url: 'https://twitch.tv/lck_korea',
      game_name: 'League of Legends'
    }
  ]

  setTopStreams(state, topStreams)

  expect(state.topStreams).toEqual(topStreams)
})

test('set setTwitchGameInfo', () => {
  const state = _.cloneDeep(defaultData)
  const twitchGameInfo = {
    '18122': {
      id: '18122',
      name: 'World of Warcraft',
      box_art_url:
        'https://static-cdn.jtvnw.net/ttv-boxart/World%20of%20Warcraft-{width}x{height}.jpg'
    },
    '21779': {
      id: '21779',
      name: 'League of Legends',
      box_art_url:
        'https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-{width}x{height}.jpg'
    },
    '29595': {
      id: '29595',
      name: 'Dota 2',
      box_art_url:
        'https://static-cdn.jtvnw.net/ttv-boxart/Dota%202-{width}x{height}.jpg'
    }
  }

  setTwitchGameInfo(state, twitchGameInfo)

  expect(state.twitchGameInfo).toEqual(twitchGameInfo)
})

test('add stream', () => {
  const state = _.cloneDeep(defaultData)
  const stream = {
    streamName: 'lirik',
    id: 'jxvu1mhp',
    dateAdded: 'Sat May 18 2019 11:16:23 GMT+0100 (British Summer Time)'
  }

  const expected = Object.assign({}, stream)
  expected.embedPlayerID = `embed-player-${expected.streamName}-${expected.id}`

  addStream(state, stream)
  expect(state.streams).toEqual([expected])
})

test('remove stream', () => {
  const state = _.cloneDeep(defaultData)
  const stream = {
    streamName: 'lirik',
    id: 'jxvu1mhp',
    dateAdded: 'Sat May 18 2019 11:16:23 GMT+0100 (British Summer Time)'
  }
  const expected = Object.assign({}, stream)
  expected.embedPlayerID = `embed-player-${expected.streamName}-${expected.id}`

  addStream(state, stream)
  expect(state.streams).toEqual([expected])

  removeStream(state, stream)
  expect(state.streams).toEqual([])
})

test('set streams', () => {
  const state = _.cloneDeep(defaultData)
  const streams = [
    {
      streamName: 'lirik',
      id: 'jxvu1mhp',
      dateAdded: 'Sat May 18 2019 11:16:23 GMT+0100 (British Summer Time)'
    }
  ]
  setStreams(state, streams)

  expect(state.streams).toEqual(streams)
})

test('set options', () => {
  const state = _.cloneDeep(defaultData)
  const options = Object.assign({}, defaultData.options)
  setOptions(state, options)

  expect(state.options).toEqual(options)
})

test('add stream to history', () => {
  const state = _.cloneDeep(defaultData)
  const stream = {
    streamName: 'lirik',
    id: 'jxvu1mhp',
    dateAdded: 'Sat May 18 2019 11:16:23 GMT+0100 (British Summer Time)'
  }
  addStreamToHistory(state, stream)

  expect(state.streamHistory).toEqual([stream])
})

test('set history', () => {
  const state = _.cloneDeep(defaultData)
  const favorites = [
    {
      streamName: 'lirik',
      id: 'jxvu1mhp',
      dateAdded: 'Sat May 18 2019 11:16:23 GMT+0100 (British Summer Time)'
    }
  ]
  setHistory(state, favorites)

  expect(state.streamHistory).toEqual(favorites)
})

test('add stream to favorites', () => {
  const state = _.cloneDeep(defaultData)
  const stream = {
    streamName: 'lirik',
    id: 'jxvu1mhp',
    dateAdded: 'Sat May 18 2019 11:16:23 GMT+0100 (British Summer Time)'
  }
  addStreamToFavorites(state, stream)

  expect(state.streamFavorites).not.toEqual([stream])
})

test('remove stream from favorites', () => {
  const state = _.cloneDeep(defaultData)
  const stream = {
    streamName: 'lirik',
    id: 'jxvu1mhp',
    dateAdded: 'Sat May 18 2019 11:16:23 GMT+0100 (British Summer Time)'
  }
  addStreamToFavorites(state, stream)
  expect(state.streamFavorites).toEqual([stream])

  removeStreamFromFavorites(state, stream)
  expect(state.streamFavorites).toEqual([])
})

test('set favorites', () => {
  const state = _.cloneDeep(defaultData)
  const favorites = [
    {
      streamName: 'lirik',
      id: 'jxvu1mhp',
      dateAdded: 'Sat May 18 2019 11:16:23 GMT+0100 (British Summer Time)'
    }
  ]
  setFavorites(state, favorites)

  expect(state.streamFavorites).toEqual(favorites)
})

test('set presets', () => {
  const state = _.cloneDeep(defaultData)
  const presets = [
    {
      name: 'Preset 1',
      streams: [
        {
          streamName: 'lirik',
          id: 'jxvu1mhp',
          dateAdded: 'Sat May 18 2019 11:26:14 GMT+0100 (British Summer Time)',
          embedPlayerID: 'embed-player-lirik-jxvu1mhp'
        },
        {
          streamName: 'giantwaffle',
          id: '69ybpjem',
          dateAdded: 'Sat May 18 2019 11:26:14 GMT+0100 (British Summer Time)'
        }
      ],
      id: 'brp5rig'
    }
  ]
  setPresets(state, presets)

  expect(state.streamPresets).toEqual(presets)
})

test('update presets', () => {
  const state = _.cloneDeep(defaultData)
  const preset = {
    name: 'Preset 1',
    streams: [
      {
        streamName: 'lirik',
        id: 'jxvu1mhp',
        dateAdded: 'Sat May 18 2019 11:26:14 GMT+0100 (British Summer Time)',
        embedPlayerID: 'embed-player-lirik-jxvu1mhp'
      },
      {
        streamName: 'giantwaffle',
        id: '69ybpjem',
        dateAdded: 'Sat May 18 2019 11:26:14 GMT+0100 (British Summer Time)'
      }
    ],
    id: 'brp5rig'
  }
  const presets = [preset]
  const updatedpreset = _.cloneDeep(preset)
  updatedpreset.name = 'Preset 2'

  setPresets(state, presets)
  expect(state.streamPresets).toEqual(presets)

  updatePreset(state, updatedpreset)
  expect(state.streamPresets).toEqual([updatedpreset])
})

test('add preset to presets', () => {
  const state = _.cloneDeep(defaultData)
  const preset = {
    name: 'Preset 1',
    streams: [
      {
        streamName: 'lirik',
        id: 'jxvu1mhp',
        dateAdded: 'Sat May 18 2019 11:26:14 GMT+0100 (British Summer Time)',
        embedPlayerID: 'embed-player-lirik-jxvu1mhp'
      },
      {
        streamName: 'giantwaffle',
        id: '69ybpjem',
        dateAdded: 'Sat May 18 2019 11:26:14 GMT+0100 (British Summer Time)'
      }
    ],
    id: 'brp5rig'
  }
  addPresetToPresets(state, preset)

  expect(state.streamPresets).toEqual([preset])
})

test('remove preset from presets', () => {
  const state = _.cloneDeep(defaultData)
  const preset = {
    name: 'Preset 1',
    streams: [
      {
        streamName: 'lirik',
        id: 'jxvu1mhp',
        dateAdded: 'Sat May 18 2019 11:26:14 GMT+0100 (British Summer Time)'
      },
      {
        streamName: 'giantwaffle',
        id: '69ybpjem',
        dateAdded: 'Sat May 18 2019 11:26:14 GMT+0100 (British Summer Time)'
      }
    ],
    id: 'brp5rig'
  }
  addPresetToPresets(state, preset)
  expect(state.streamPresets).toEqual([preset])

  removePresetFromPresets(state, preset)
  expect(state.streamPresets).toEqual([])
})
