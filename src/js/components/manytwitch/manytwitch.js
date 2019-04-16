import IconButton from 'Components/inputs/buttons/iconButton/IconButton.vue'
import InputForm from 'Components/inputs/inputForm/InputForm.vue'
import ListItem from 'Components/list/listItem/ListItem.vue'
import List from 'Components/list/list/List.vue'

import LayoutMenu from 'Components/menu/layoutMenu/LayoutMenu.vue'
import HistoryMenu from 'Components/menu/historyMenu/HistoryMenu.vue'
import PresetMenu from 'Components/menu/presetMenu/PresetMenu.vue'
import HelpMenu from 'Components/menu/helpMenu/HelpMenu.vue'
import AboutMenu from 'Components/menu/aboutMenu/AboutMenu.vue'
import SideMenu from 'Components/menu/sideMenu/SideMenu.vue'
import FavoritesMenu from 'Components/menu/favoritesMenu/FavoritesMenu.vue'
import SettingsMenu from 'Components/menu/settingsMenu/SettingsMenu.vue'

import Streams from 'Components/stream/streamList/StreamList.vue'
import Chats from 'Components/chat/chatList/ChatList.vue'
import Intro from 'Components/intro/Intro.vue'

import Icons from 'Js/icons/'
import {
  generateID,
  log,
  warn,
  getDefault,
  toggleFullscreen,
  createStreamObject
} from 'Js/utilities'
import {
  validateHistory,
  validatePresets,
  validateOptions,
  validateFavorites
} from 'Js/validation'
import { getTopStreams, getGameInfo } from 'Js/twitch'

const localStorage = window.localStorage

export default {
  name: 'manytwitch',
  components: {
    IconButton,
    InputForm,
    SideMenu,
    Streams,
    Chats,
    LayoutMenu,
    HistoryMenu,
    PresetMenu,
    HelpMenu,
    AboutMenu,
    FavoritesMenu,
    SettingsMenu,
    Intro,
    List,
    ListItem
  },
  icons: Icons,
  menuItems: [
    {
      itemName: 'Layouts',
      iconName: Icons.layouts
    },
    {
      itemName: 'Favorites',
      iconName: Icons.favorite
    },
    {
      itemName: 'Presets',
      iconName: Icons.presets
    },
    {
      itemName: 'History',
      iconName: Icons.history
    },
    {
      itemName: 'Help',
      iconName: Icons.help
    },
    {
      itemName: 'About',
      iconName: Icons.about
    },
    {
      itemName: 'Settings',
      iconName: Icons.settings
    }
  ],
  appName: {
    formatted: 'Manytwitch',
    lowercase: 'manytwitch'
  },
  config: {
    maxHistoryLength: 20
  },
  storage: {
    fields: {
      options: 'options',
      presets: 'stream_presets',
      history: 'stream_history',
      favorites: `channel_favorites`
    }
  },
  data: function () {
    return {
      streams: [],
      streamHistory: [],
      streamPresets: [],
      streamFavorites: [],
      availableLayouts: [
        { id: 'grid', name: 'Grid' },
        { id: 'columns', name: 'Columns' },
        { id: 'rows', name: 'Rows' }
      ],
      appHover: false,
      appHoverTracker: 0,
      navVisible: true,
      smallInterface: false,
      homepageStreams: [],
      options: {
        chatVisible: true,
        menuVisible: true,
        startMuted: true,
        currentLayout: { id: 'grid', name: 'Grid' }
      }
    }
  },
  watch: {
    streams: function () {
      if (this.streams.length === 0 && this.homepageStreams.length === 0) {
        this.getHomePageContent()
      }
    }
  },
  methods: {
    toggleFullscreen: toggleFullscreen,
    createStreamObject: createStreamObject,

    changeLayout: function (newLayout) {
      if (this.availableLayouts.includes(newLayout)) {
        this.options.currentLayout = newLayout
        this.storeOptions(this.options)
      } else {
        log('The specified layout does not exist')
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

    // Stream methods
    addStream: function (streamName) {
      const stream = this.createStreamObject(streamName, generateID())
      this.updateStreams(this.streams.concat([stream]))
      this.addStreamToHistory(streamName)
      this.setHistory(this.streamHistory)
    },
    updateStreams: function (updatedStreams) {
      this.streams = updatedStreams
      this.insertURLStreamParams()
    },

    // Option methods
    setOptions: function (options) {
      this.loadOptions(options)
      this.storeOptions(options)
    },
    storeOptions: function (options) {
      if (validateOptions(options)) {
        localStorage.setItem(
          this.$options.storage.fields.options,
          JSON.stringify(options)
        )
      }
    },
    loadOptions: function (options) {
      this.options = options
    },
    getStoredOptions: function () {
      return localStorage.getItem(this.$options.storage.fields.options)
    },

    // Preset methods
    getStoredPresets: function () {
      return localStorage.getItem(this.$options.storage.fields.presets)
    },
    loadStreamsFromPreset: function (preset) {
      this.streams = []
      for (const stream of preset.streams) {
        this.addStream(stream)
      }
    },
    storePresets: function (presets) {
      if (validatePresets(presets)) {
        localStorage.setItem(
          this.$options.storage.fields.presets,
          JSON.stringify(presets)
        )
      }
    },
    loadPresets: function (newPresets) {
      this.streamPresets = newPresets
    },
    setPresets: function (newPresets) {
      const presets = newPresets || []
      this.loadPresets(presets)
      this.storePresets(presets)
    },

    // Favorite methods
    addStreamToFavorites: function (streamName) {
      let newFavorites = this.streamFavorites
      const stream = {
        id: generateID(),
        streamName: streamName
      }
      newFavorites = newFavorites.filter(streamFavoriteItem => {
        return streamFavoriteItem.streamName !== streamName
      })
      this.setFavorites([].concat([stream], newFavorites))
    },
    unfavoriteStream: function (streamName) {
      const newFavorites = this.streamFavorites.filter(streamFavoriteItem => {
        return streamFavoriteItem.streamName !== streamName
      })
      this.setFavorites(newFavorites)
    },
    clearFavorites: function () {
      this.setFavorites([])
    },
    loadSelectedFavorite: function (streamName) {
      this.addStream(streamName)
    },
    getStoredFavorites: function () {
      return localStorage.getItem(this.$options.storage.fields.favorites)
    },
    storeFavorites: function (favorites) {
      if (validateFavorites(favorites)) {
        localStorage.setItem(
          this.$options.storage.fields.favorites,
          JSON.stringify(favorites)
        )
      }
    },
    loadFavorites: function (streamFavorites) {
      if (streamFavorites) {
        this.streamFavorites = streamFavorites
      }
    },
    setFavorites: function (streamFavorites) {
      this.streamFavorites = streamFavorites
      this.storeFavorites(streamFavorites)
    },

    // History methods
    addStreamToHistory: function (streamName) {
      let newHistory = this.streamHistory
      const stream = {
        id: generateID(),
        streamName: streamName,
        dateAdded: new Date()
      }
      // Stop duplicate channels in history
      newHistory = newHistory.filter(streamHistoryItem => {
        return streamHistoryItem.streamName !== streamName
      })

      // Limit the amount of history items
      if (newHistory.length < this.$options.config.maxHistoryLength) {
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
      return localStorage.getItem(this.$options.storage.fields.history)
    },
    storeHistory: function (history) {
      const formattedHistory = history
      for (const stream of history) {
        if (stream.dateAdded) {
          stream.dateAdded = String(stream.dateAdded)
        }
      }
      if (validateHistory(formattedHistory)) {
        localStorage.setItem(
          this.$options.storage.fields.history,
          JSON.stringify(formattedHistory)
        )
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

    // Querystring methods
    // Adds current channels into the querystring
    insertURLStreamParams: function () {
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
    // Gets the current channels from the querystring
    getURLStreamParam: function () {
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

    // Storage methods
    getStoredData: function () {
      const storedDataFields = [
        {
          name: 'History',
          getStored: this.getStoredHistory,
          validate: validateHistory,
          load: this.loadHistory,
          default: getDefault('streamHistory'),
          set: this.setHistory
        },
        {
          name: 'Favorites',
          getStored: this.getStoredFavorites,
          validate: validateFavorites,
          load: this.loadFavorites,
          default: getDefault('streamFavorites'),
          set: this.setFavorites
        },
        {
          name: 'Options',
          getStored: this.getStoredOptions,
          validate: validateOptions,
          load: this.loadOptions,
          default: getDefault('options'),
          set: this.setOptions
        },
        {
          name: 'Presets',
          getStored: this.getStoredPresets,
          validate: validatePresets,
          load: this.loadPresets,
          default: getDefault('streamPresets'),
          set: this.setPresets
        }
      ]

      console.group('Getting Stored Data')

      // Iterate through stored data and load to data if valid
      // otherwise load the default data and store it
      storedDataFields.forEach(field => {
        let fieldLoaded = false
        const rawFieldData = field.getStored()
        if (rawFieldData) {
          try {
            const parsedFieldData = JSON.parse(rawFieldData)
            if (field.validate(parsedFieldData)) {
              log(`${field.name} passed validation`)
              field.load(parsedFieldData)
              fieldLoaded = true
            }
          } catch (error) {}
        }
        if (!fieldLoaded) {
          warn(`Loading default ${field.name}`)
          const defaultFieldData = field.default
          field.set(defaultFieldData)
        }
      })

      console.groupEnd()
    },
    clearData: function () {
      this.setOptions(getDefault('options'))
      this.setFavorites(getDefault('streamFavorites'))
      this.setHistory(getDefault('streamHistory'))
      this.setPresets(getDefault('streamPresets'))
    },

    // Other methods
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
    },
    getHomePageContent: async function () {
      const topStreams = await getTopStreams(20)
      if (topStreams.length) {
        const gameIds = topStreams.map(stream => {
          return stream.game_id
        })
        if (gameIds.length) {
          // Get game info based on game ids
          const gameInfo = await getGameInfo(gameIds)
          if (gameInfo.data) {
            // Map game info to streams
            const streamInfo = topStreams.map((stream, index) => {
              if (gameInfo.data.hasOwnProperty(index)) {
                const game = gameInfo.data[index]
                if (game.name) {
                  stream.game_name = game.name
                }
              }
              return stream
            })
            this.homepageStreams = streamInfo
          }
        }
      }
    },
    checkScreenSize: function () {
      this.smallInterface = window.innerWidth <= 1000
    }
  },
  mounted: function () {
    document.addEventListener('mousemove', this.checkMovement, false)

    // Allow exit from hidden nav view
    const app = this
    window.addEventListener(
      'keydown',
      function (e) {
        if (
          !app.navVisible &&
          (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27)
        ) {
          e.preventDefault()
          app.navVisible = true
        }
      },
      true
    )

    window.addEventListener('resize', this.checkScreenSize)

    // Alert users with small screens about potential incompatibility
    const mobileWarning = `${
      this.$options.appName.formatted
    } does not currently support mobile devices. Please use a device with a larger screen.`
    setTimeout(() => {
      if (window.innerWidth < 800 || window.innerHeight < 600) {
        window.alert(mobileWarning)
      }
    }, 1000)

    // Check if initial streams from querystring
    if (!this.streams.length) {
      this.getHomePageContent()
    }
  },
  created: function () {
    // Load stored data and load default data if stored data isn't available
    this.getStoredData()

    // Set mobile interface on small screens
    this.checkScreenSize()

    // Get streams from url querystring
    this.getURLStreamParam()
  }
}
