import FullscreenButton from 'Components/inputs/buttons/iconButtons/fullscreenButton/FullscreenButton.vue'
import ArrowButton from 'Components/inputs/buttons/iconButtons/arrowButton/ArrowButton.vue'
import ChatButton from 'Components/inputs/buttons/iconButtons/chatButton/ChatButton.vue'
import MenuButton from 'Components/inputs/buttons/iconButtons/menuButton/MenuButton.vue'
import InputForm from 'Components/inputs/inputForm/InputForm.vue'

import LayoutMenu from 'Components/menu/layoutMenu/LayoutMenu.vue'
import HistoryMenu from 'Components/menu/historyMenu/HistoryMenu.vue'
import PresetMenu from 'Components/menu/presetMenu/PresetMenu.vue'
import HelpMenu from 'Components/menu/helpMenu/HelpMenu.vue'
import AboutMenu from 'Components/menu/aboutMenu/AboutMenu.vue'
import SideMenu from 'Components/menu/sideMenu/SideMenu.vue'

import Streams from 'Components/stream/streamList/StreamList.vue'
import Chats from 'Components/chat/chatList/ChatList.vue'

import { generateID, log, getDefault } from 'Js/utilities'
import {
  testValidators,
  validateHistory,
  validatePresets,
  validateOptions
} from 'Js/validation'

export default {
  name: 'manytwitch',
  components: {
    FullscreenButton,
    ArrowButton,
    ChatButton,
    MenuButton,
    InputForm,
    SideMenu,
    Streams,
    Chats,
    LayoutMenu,
    HistoryMenu,
    PresetMenu,
    HelpMenu,
    AboutMenu
  },
  menuItems: [
    {
      itemName: 'Layouts',
      iconName: 'view_module'
    },
    {
      itemName: 'Presets',
      iconName: 'view_list'
    },
    {
      itemName: 'History',
      iconName: 'history'
    },
    {
      itemName: 'Help',
      iconName: 'help'
    },
    {
      itemName: 'About',
      iconName: 'info'
    }
  ],
  data: function () {
    return {
      streams: [],
      streamHistory: [],
      streamPresets: [],
      availableLayouts: [
        { id: 'grid', name: 'Grid' },
        { id: 'column', name: 'Column' }
      ],
      appHover: false,
      appHoverTracker: 0,
      navVisible: true,
      options: {
        chatVisible: true,
        menuVisible: true,
        startMuted: true,
        currentLayout: { id: 'grid', name: 'Grid' }
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
      this.updateStreams(this.streams.concat([stream]))
      this.addStreamToHistory(streamName)
      this.setHistory(this.streamHistory)
    },
    createStreamObject: function (streamName) {
      return {
        streamName: streamName,
        embedPlayerID: `embed-player-${streamName}-${this.streams.length}`,
        index: this.streams.length
      }
    },
    updateStreams: function (updatedStreams) {
      this.streams = updatedStreams
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
    toggleNav: function () {
      this.navVisible = !this.navVisible
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
      this.streams = []
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
      let newHistory = this.streamHistory
      const stream = {
        id: generateID(8),
        streamName: streamName,
        dateAdded: new Date()
      }
      newHistory = newHistory.filter(streamHistoryItem => {
        return streamHistoryItem.streamName !== streamName
      })
      if (newHistory.length < this.config.maxHistoryLength) {
        newHistory = newHistory.concat([stream])
      } else {
        newHistory = newHistory.slice(1, newHistory.length).concat([stream])
      }
      this.streamHistory = newHistory
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
      for (const channel in this.streams) {
        if (this.streams.hasOwnProperty(channel)) {
          channelString += String(this.streams[channel].streamName) + ','
        }
      }
      channelString = channelString.replace('undefined', '')
      const newurl = `${window.location.protocol}//${window.location.host}${
        window.location.pathname
      }`
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
        } catch (error) {}
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
        } catch (error) {}
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
        } catch (error) {}
      }
      if (!presetsLoaded) {
        log('Loading default presets')
        const defaultPresets = getDefault('streamPresets')
        this.streamPresets = defaultPresets
        this.storePresets(defaultPresets)
      }
      log('--- Completed Stored Data Collection ---')
    },
    checkMovement: function () {
      this.appHover = true
      this.appHoverTracker += 1

      const app = this
      setTimeout(function () {
        app.appHoverTracker -= 1
        if (app.appHoverTracker === 0) {
          app.appHover = false
        }
      }, 3000)
    }
  },
  mounted: function () {
    document.addEventListener('mousemove', this.checkMovement, false)

    const app = this
    window.addEventListener(
      'keydown',
      function (e) {
        if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
          e.preventDefault()
          app.navVisible = true
        }
      },
      true
    )
  },
  created: function () {
    testValidators()

    this.getStoredData()

    // Get streams from url querystring
    this.getURLParam()
  }
}
