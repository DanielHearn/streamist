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
  createStreamObject,
  getUsernameFromThumbnail
} from 'Js/utilities'
import { getTopStreams, getGameInfo } from 'Js/twitch'
import {
  validateHistory,
  validatePresets,
  validateOptions,
  validateFavorites
} from 'Js/validation'
import {
  getStoredOptions,
  getStoredPresets,
  getStoredFavorites,
  getStoredHistory
} from 'Js/storage'

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
  data: function () {
    return {
      appHover: false,
      appHoverTracker: 0,
      homepageStreams: []
    }
  },
  computed: {
    streamsLength () {
      return this.$store.state.streams.length
    }
  },
  watch: {
    streamsLength: function (oldLength, newLength) {
      if (newLength === 0 && this.homepageStreams.length === 0) {
        this.getHomePageContent()
      }
    }
  },
  methods: {
    toggleFullscreen: toggleFullscreen,

    toggleChat: function () {
      const options = this.$store.state.options
      options.chatVisible = !options.chatVisible
      if (this.$store.state.smallInterface && options.menuVisible) {
        options.menuVisible = !options.menuVisible
      }
      this.$store.commit('setOptions', options)
    },
    toggleMenu: function () {
      const options = this.$store.state.options
      options.menuVisible = !options.menuVisible
      if (this.$store.state.smallInterface && options.chatVisible) {
        options.chatVisible = !options.chatVisible
      }
      this.$store.commit('setOptions', options)
    },
    toggleNav: function () {
      const options = this.$store.state.options
      options.navVisible = !options.navVisible
      this.$store.commit('setOptions', options)
    },

    addStream: function (streamName) {
      const streamObj = createStreamObject(streamName, generateID())
      this.$store.commit('addStream', streamObj)
      this.$store.commit('addStreamToHistory', streamObj)
      this.insertURLStreamParams()
    },
    updateStreams: function (streams) {
      this.$store.commit('setStreams', streams)
      this.insertURLStreamParams()
    },

    // Querystring methods
    // Adds current channels into the querystring
    insertURLStreamParams: function () {
      let channelString = ''
      const streams = this.$store.state.streams
      for (const channel in streams) {
        if (streams.hasOwnProperty(channel)) {
          channelString += String(streams[channel].streamName) + ','
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

    clearData: function () {
      this.$store.commit('setOptions', getDefault('options'))
      this.$store.commit('setFavorites', getDefault('streamFavorites'))
      this.$store.commit('setHistory', getDefault('streamHistory'))
      this.$store.commit('setPresets', getDefault('streamPresets'))
    },

    loadStoredData: function () {
      const storedDataFields = [
        {
          name: 'History',
          getStored: getStoredHistory,
          validate: validateHistory,
          default: getDefault('streamHistory'),
          set: 'setHistory'
        },
        {
          name: 'Favorites',
          getStored: getStoredFavorites,
          validate: validateFavorites,
          default: getDefault('streamFavorites'),
          set: 'setFavorites'
        },
        {
          name: 'Options',
          getStored: getStoredOptions,
          validate: validateOptions,
          default: getDefault('options'),
          set: 'setOptions'
        },
        {
          name: 'Presets',
          getStored: getStoredPresets,
          validate: validatePresets,
          default: getDefault('streamPresets'),
          set: 'setPresets'
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
              this.$store.commit(field.set, parsedFieldData)
              fieldLoaded = true
            }
          } catch (error) {}
        }
        if (!fieldLoaded) {
          warn(`Loading default ${field.name}`)
          const defaultFieldData = field.default
          this.$store.commit(field.set, defaultFieldData)
        }
      })

      console.groupEnd()
    },

    // Other methods
    checkMovement: function () {
      this.appHover = true
      this.appHoverTracker += 1

      setTimeout(() => {
        this.appHoverTracker -= 1
        if (this.appHoverTracker === 0) {
          this.appHover = false
        }
      }, 3000)
    },

    getHomePageContent: async function () {
      const thumbnailWidth = '480'
      const thumbnailHeight = '270'
      const twitchUrlRoot = 'https://twitch.tv/'
      const topStreams = await getTopStreams(20)

      if (topStreams.length) {
        this.$store.commit('setTopStreams', topStreams)

        const gameIds = topStreams.map(stream => {
          return stream.game_id
        })
        if (gameIds.length) {
          // Get game info based on game ids
          const gameInfo = await getGameInfo(gameIds)
          if (gameInfo.data) {
            // Make game info object mapped by id
            const mappedGameinfo = {}
            for (let index in gameInfo.data) {
              if (gameInfo.data.hasOwnProperty(index)) {
                const game = gameInfo.data[index]
                if (game.id) {
                  mappedGameinfo[game.id] = { ...game }
                }
              }
            }
            this.$store.commit('setTwitchGameInfo', mappedGameinfo)

            // Map game info to streams if available
            const streamInfo = topStreams.map(stream => {
              if (mappedGameinfo.hasOwnProperty(stream.game_id)) {
                const game = mappedGameinfo[stream.game_id]

                if (stream.thumbnail_url) {
                  const thumbnailUrl = stream.thumbnail_url
                  stream.thumbnail = thumbnailUrl
                    .replace('{width}', thumbnailWidth)
                    .replace('{height}', thumbnailHeight)

                  const username = getUsernameFromThumbnail(thumbnailUrl)
                  if (username) {
                    stream.clean_username = username
                    stream.url = `${twitchUrlRoot}${username}`
                  }
                }
                if (game.name) {
                  stream.game_name = game.name
                }
              }
              return stream
            })
            this.homepageStreams = streamInfo.slice(0, 4)
          }
        }
      }
    },
    checkScreenSize: function () {
      this.$store.commit('setSmallInterface', window.innerWidth <= 800)
    }
  },
  mounted: function () {
    document.addEventListener('mousemove', this.checkMovement, false)

    // Allow exit from hidden nav view
    window.addEventListener(
      'keydown',
      e => {
        const options = this.$store.state.options
        if (
          !options.navVisible &&
          (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27)
        ) {
          e.preventDefault()
          options.navVisible = true
          this.$store.commit('setOptions', options)
        }
      },
      true
    )

    window.addEventListener('resize', this.checkScreenSize)

    // Disable as mobile should be usable now as of 27/04/19
    /*
    // Alert users with small screens about potential incompatibility
    const mobileWarning = `${
      this.$options.appName.formatted
    } does not currently support mobile devices. Please use a device with a larger screen.`
    setTimeout(() => {
      if (window.innerWidth < 800 || window.innerHeight < 600) {
        window.alert(mobileWarning)
      }
    }, 1000) */

    // Check if initial streams from querystring
    if (!this.$store.state.streams.length) {
      this.getHomePageContent()
    }
  },
  created: function () {
    // Load stored data and load default data if stored data isn't available
    this.loadStoredData()

    // Set mobile interface on small screens
    this.checkScreenSize()

    // Get streams from url querystring
    this.getURLStreamParam()
  }
}
