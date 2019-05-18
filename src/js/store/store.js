import { config } from './../config'
import {
  setStoredOptions,
  setStoredPresets,
  setStoredFavorites,
  setStoredHistory
} from './../storage'

export const mutations = {
  setSmallInterface (state, value) {
    state.smallInterface = value
  },
  setTopStreams (state, topStreams) {
    state.topStreams = topStreams
  },
  setTwitchGameInfo (state, twitchGameInfo) {
    state.twitchGameInfo = twitchGameInfo
  },

  addStream (state, streamObj) {
    const stream = Object.assign({}, streamObj)
    stream.embedPlayerID = `embed-player-${stream.streamName}-${stream.id}`
    state.streams.push(stream)
  },
  removeStream (state, streamObj) {
    state.streams = state.streams.filter(stream => stream.id !== streamObj.id)
  },
  setStreams (state, streams) {
    state.streams = streams
  },

  setOptions (state, options) {
    state.options = options
    setStoredOptions(options)
  },

  addStreamToHistory: function (state, streamObj) {
    const stream = Object.assign({}, streamObj)
    delete stream.embedPlayerID

    let newHistory = state.streamHistory
    // Stop duplicate channels in history
    newHistory = newHistory.filter(streamHistory => {
      return streamHistory.streamName !== stream.streamName
    })

    // Limit the amount of history items
    if (newHistory.length < config.maxHistoryLength) {
      newHistory = newHistory.concat([stream])
    } else {
      newHistory = newHistory.slice(1, newHistory.length).concat([stream])
    }
    state.streamHistory = newHistory
    setStoredHistory(newHistory)
  },
  setHistory (state, history) {
    state.streamHistory = history
    setStoredHistory(history)
  },

  addStreamToFavorites: function (state, streamObj) {
    const stream = Object.assign({}, streamObj)
    delete stream.embedPlayerID

    let newFavorites = state.streamFavorites
    newFavorites = newFavorites.filter(streamFavorite => {
      return streamFavorite.streamName !== stream.streamName
    })

    newFavorites = newFavorites.concat([stream])
    state.streamFavorites = newFavorites
    setStoredFavorites(newFavorites)
  },
  removeStreamFromFavorites: function (state, streamObj) {
    const newFavorites = state.streamFavorites.filter(streamFavorite => {
      return streamFavorite.streamName !== streamObj.streamName
    })
    state.streamFavorites = newFavorites
    setStoredFavorites(newFavorites)
  },
  setFavorites (state, favorites) {
    state.streamFavorites = favorites
    setStoredFavorites(favorites)
  },

  setPresets (state, presets) {
    state.streamPresets = presets
    setStoredPresets(presets)
  },
  addPresetToPresets (state, preset) {
    if (preset.streams) {
      for (let i = 0; i < preset.streams.length; i++) {
        delete preset.streams[i].embedPlayerID
      }
    }
    state.streamPresets = state.streamPresets.concat(preset)
    setStoredPresets(state.streamPresets)
  },
  removePresetFromPresets: function (state, preset) {
    state.streamPresets = state.streamPresets.filter(
      streamPreset => streamPreset.id !== preset.id
    )
    setStoredPresets(state.streamPresets)
  },
  updatePreset (state, updatedPreset) {
    const updatedPresets = state.streamPresets
    for (let i = 0; i < updatedPresets.length; i++) {
      const preset = updatedPresets[i]
      if (preset.id === updatedPreset.id) {
        preset.name = updatedPreset.name
        preset.streams = updatedPreset.streams
      }
    }
    state.streamPresets = updatedPresets
    setStoredPresets(updatedPresets)
  }
}

export const storeConfig = {
  state: {
    streams: [],
    streamHistory: [],
    streamPresets: [],
    streamFavorites: [],
    topStreams: [],
    twitchGameInfo: [],
    smallInterface: false,
    options: {
      chatVisible: true,
      menuVisible: true,
      navVisible: true,
      startMuted: true,
      currentLayout: { id: 'grid', name: 'Grid' }
    }
  },
  mutations
}
