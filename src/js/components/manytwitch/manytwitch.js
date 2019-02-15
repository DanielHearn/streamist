import FullscreenButton from 'Components/buttons/fullscreenButton/FullscreenButton.vue'
import ArrowButton from 'Components/buttons/arrowButton/ArrowButton.vue'
import ChatButton from 'Components/buttons/chatButton/ChatButton.vue'
import MenuButton from 'Components/buttons/menuButton/MenuButton.vue'

import InputForm from 'Components/inputForm/InputForm.vue'
import MenuContainer from 'Components/menuContainer/MenuContainer.vue'
import Streams from 'Components/streams/Streams.vue'
import Chats from 'Components/chats/Chats.vue'
import { generateID, log, getDefault } from 'Js/utilities'
import { testValidators, validateHistory, validatePresets, validateOptions } from 'Js/validation'

export default {
  name: 'manytwitch',
  components: {
    FullscreenButton,
    ArrowButton,
    ChatButton,
    MenuButton,
    InputForm,
    MenuContainer,
    Streams,
    Chats
  },
  data: function () {
    return {
      currentStreams: [],
      streamHistory: [],
      streamPresets: [],
      availableLayouts: [
        {id: 'grid', name: 'Grid'},
        {id: 'column', name: 'Column'}
      ],
      options: {
        chatVisible: true,
        menuVisible: true,
        startMuted: true,
        currentLayout: {id: 'grid', name: 'Grid'}
      },
      config: {
        maxHistoryLength: 20
      }
    }
  },
  methods: {
    addStreamFromNav: function (e, streamName) {
      e.preventDefault()
      if (!streamName) {
        return false
      }
      this.addStream(streamName)
    },
    addStream: function (streamName) {
      const stream = this.createStreamObject(streamName)
      this.updateStreams(this.currentStreams.concat([stream]))
      this.addStreamToHistory(streamName)
      this.setHistory(this.streamHistory)
    },
    createStreamObject: function (streamName) {
      return {
        streamName: streamName,
        embedPlayerID: `embed-player-${streamName}-${this.currentStreams.length}`,
        index: this.currentStreams.length
      }
    },
    updateStreams: function (updatedStreams) {
      this.currentStreams = updatedStreams
      this.insertURLParam()
    },
    changeLayout: function (newLayout) {
      if (this.availableLayouts.includes(newLayout)) {
        this.options.currentLayout = newLayout
        this.storeOptions(this.options)
      }
    },
    toggleChat: function () {
      this.options.chatVisible = !this.options.chatVisible
      this.storeOptions(this.options)
    },
    toggleMenu: function () {
      this.options.menuVisible = !this.options.menuVisible
      this.storeOptions(this.options)
    },

    storeOptions: function (options) {
      if (validateOptions(options)) {
        localStorage.setItem('manytwitch_options', JSON.stringify(options))
      }
    },
    getStoredOptions: function () {
      return localStorage.getItem('manytwitch_options')
    },

    getStoredPresets: function () {
      return localStorage.getItem('manytwitch_presets')
    },
    loadStreamsFromPreset: function (preset) {
      this.currentStreams = []
      for (const stream of preset.streams) {
        this.addStream(stream)
      }
    },
    storePresets: function (presets) {
      if (validatePresets(presets)) {
        localStorage.setItem('manytwitch_presets', JSON.stringify(presets))
      }
    },
    updatePresets: function (newPresets) {
      this.streamPresets = newPresets
      const presets = newPresets || []
      this.storePresets(presets)
    },

    addStreamToHistory: function (streamName) {
      const stream = {
        id: generateID(8),
        streamName: streamName,
        dateAdded: new Date()
      }
      if (this.streamHistory.length < this.config.maxHistoryLength) {
        this.streamHistory = this.streamHistory.concat([stream])
      } else {
        this.streamHistory = this.streamHistory.slice(1, this.streamHistory.length).concat([stream])
      }
    },
    clearHistory: function () {
      this.setHistory([])
    },
    loadSelectedHistory: function (streamName) {
      this.addStream(streamName)
    },
    getStoredHistory: function () {
      return localStorage.getItem('stream_history')
    },
    storeHistory: function (history) {
      const formattedHistory = history
      for (const stream of history) {
        if (stream.dateAdded) {
          stream.dateAdded = String(stream.dateAdded)
        }
      }
      if (validateHistory(formattedHistory)) {
        localStorage.setItem('stream_history', JSON.stringify(formattedHistory))
      }
    },
    loadHistory: function (streamHistory) {
      if (streamHistory) {
        const formattedHistory = streamHistory
        for (const stream of formattedHistory) {
          stream.dateAdded = new Date(stream.dateAdded)
        }
        this.streamHistory = formattedHistory
      }
    },
    setHistory: function (streamHistory) {
      this.streamHistory = streamHistory
      this.storeHistory(streamHistory)
    },
    insertURLParam: function () {
      let channelString = ''
      for (const channel in this.currentStreams) {
        if (this.currentStreams.hasOwnProperty(channel)) {
          channelString += String(this.currentStreams[channel].streamName) + ','
        }
      }
      channelString = channelString.replace('undefined', '')
      const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`
      if (channelString) {
        const queryUrl = `${newurl}?stream=${channelString}`
        window.history.pushState({ path: queryUrl }, '', queryUrl)
      } else {
        window.history.pushState({ path: newurl }, '', newurl)
      }
    },
    getURLParam: function () {
      const urlParams = new URLSearchParams(window.location.search.substring(1))
      const urlStreams = urlParams.get('stream')
      if (urlStreams !== '' && urlStreams !== null) {
        const channels = urlStreams.split(',')
        for (const channel in channels) {
          const newChannel = channels[channel]
          if (newChannel !== '') {
            this.addStream(newChannel)
          }
        }
        return true
      }
      return false
    },
    getStoredData: function () {
      log('--- Getting Stored Data ---')
      const rawHistory = this.getStoredHistory()
      let historyLoaded = false
      if (rawHistory) {
        try {
          const parsedHistory = JSON.parse(rawHistory)
          if (validateHistory(parsedHistory)) {
            log('History passed validation')
            this.loadHistory(parsedHistory)
            historyLoaded = true
          }
        } catch (error) {
        }
      }
      if (!historyLoaded) {
        log('Loading default history')
        const defaultHistory = getDefault('streamHistory')
        this.streamHistory = defaultHistory
        this.storeHistory(defaultHistory)
      }

      const rawOptions = this.getStoredOptions()
      let optionsLoaded = false
      if (rawOptions) {
        try {
          const parsedOptions = JSON.parse(rawOptions)
          if (validateOptions(parsedOptions)) {
            log('Options passed validation')
            optionsLoaded = true
            this.options = parsedOptions
          }
        } catch (error) {
        }
      }
      if (!optionsLoaded) {
        log('Loading default options')
        const defaultOptions = getDefault('options')
        this.options = defaultOptions
        this.storeOptions(defaultOptions)
      }

      const rawPresets = this.getStoredPresets()
      let presetsLoaded = false
      if (rawPresets) {
        try {
          const parsedPresets = JSON.parse(rawPresets)
          if (validatePresets(parsedPresets)) {
            log('Streams passed validation')
            presetsLoaded = true
            this.streamPresets = parsedPresets
          }
        } catch (error) {
        }
      }
      if (!presetsLoaded) {
        log('Loading default presets')
        const defaultPresets = getDefault('streamPresets')
        this.streamPresets = defaultPresets
        this.storePresets(defaultPresets)
      }
      log('--- Completed Stored Data Collection ---')
    }
  },
  created: function () {
    testValidators()

    this.getStoredData()

    // Get streams from url querystring
    this.getURLParam()
  }
}
