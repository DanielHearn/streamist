import IconButton from './../inputs/buttons/iconButton/IconButton.vue'
import InputForm from './../inputs/inputForm/InputForm.vue'
import ListItem from './../list/listItem/ListItem.vue'
import List from './../list/list/List.vue'

import LayoutMenu from './../menu/layoutMenu/LayoutMenu.vue'
import HistoryMenu from './../menu/historyMenu/HistoryMenu.vue'
import PresetMenu from './../menu/presetMenu/PresetMenu.vue'
import HelpMenu from './../menu/helpMenu/HelpMenu.vue'
import AboutMenu from './../menu/aboutMenu/AboutMenu.vue'
import SideMenu from './../menu/sideMenu/SideMenu.vue'
import FavoritesMenu from './../menu/favoritesMenu/FavoritesMenu.vue'
import SettingsMenu from './../menu/settingsMenu/SettingsMenu.vue'
import PopularStreamsMenu from './../menu/popularStreamsMenu/PopularStreamsMenu.vue'
import StreamMenu from './../menu/streamMenu/StreamMenu.vue'
import StreamList from './../stream/streamList/StreamList.vue'
import Chats from './../chat/chatList/ChatList.vue'
import PopularStreams from './../popularStreams/PopularStreams.vue'
import HeartbeatLoading from './../heartbeatLoading/HeartbeatLoading.vue'

import { copyToClipboard } from './../../utilities'

import Icons from '../../icons/icons'
import {
  log,
  warn,
  getDefault,
  toggleFullscreen,
  getUsernameFromThumbnail,
  shuffleArray
} from '../../utilities/utilities'
import { getTopStreams, getGameInfo, getAccessToken } from '../../twitch/twitch'
import {
  validateHistory,
  validatePresets,
  validateOptions,
  validateFavorites
} from '../../validation/validation'
import {
  getStoredOptions,
  getStoredPresets,
  getStoredFavorites,
  getStoredHistory
} from '../../storage/storage'
import { mapState } from 'vuex';

export default {
  name: 'streamist',
  components: {
    IconButton,
    InputForm,
    SideMenu,
    StreamList,
    Chats,
    LayoutMenu,
    HistoryMenu,
    PresetMenu,
    HelpMenu,
    AboutMenu,
    FavoritesMenu,
    SettingsMenu,
    PopularStreamsMenu,
    StreamMenu,
    List,
    ListItem,
    HeartbeatLoading,
    PopularStreams
  },
  icons: Icons,
  menuItems: [
    {
      itemName: 'Streams',
      iconName: Icons.streams
    },
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
      itemName: 'Popular',
      iconName: Icons.group
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
      menuItemActive: false
    }
  },
  computed: {
    streamsLength () {
      return this.$store.state.streams.length
    }
  },
  watch: {
    streamsLength: function (oldLength, newLength) {
      if (newLength === 0 && this.$store.state.popularStreams.length === 0) {
        this.getHomePageContent()
      }
    },
    "$store.state.options.popularStreamLanguages": {
      handler: function() {
        this.getHomePageContent()
      },
      immediate: false
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
      this.$store.commit('addStreamFromName', streamName)
    },
    updateStreams: function (streams) {
      this.$store.commit('setStreams', streams)
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
      storedDataFields.forEach(async field => {
        let fieldLoaded = false
        const rawFieldData = field.getStored()
        if (rawFieldData) {
          try {
            const parsedFieldData = JSON.parse(rawFieldData)
            const valid = await field.validate(parsedFieldData)
            if (valid === true) {
              log(`${field.name} passed validation`)
              this.$store.commit(field.set, parsedFieldData)
              fieldLoaded = true
            }
          } catch (error) {}
        }
        if (!fieldLoaded) {
          warn(`Loading default ${field.name}, the invalid data was: `)
          log(rawFieldData)
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
      const accessToken = this.$store.state.accessToken
      if(!accessToken) return false

      const formattedLanguages = this.$store.state.options.popularStreamLanguages.map(language => language.value)
      const topStreams = await getTopStreams(accessToken, 20, formattedLanguages)
      this.$store.commit('setTopStreamsRetrieved', topStreams.length)
      if (topStreams.length) {
        this.$store.commit('setTopStreams', topStreams)
        
        const gameIds = topStreams.map(stream => {
          return stream.game_id
        })
        if (gameIds.length) {
          // Get game info based on game ids
          const gameInfo = await getGameInfo(accessToken, gameIds)
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

            for (let stream of streamInfo) {
              if (stream.viewer_count) {
                stream.formatted_viewer_count = (
                  stream.viewer_count / 1000
                ).toFixed(1)
              }
            }

            if (streamInfo && streamInfo.length) {
              const popularStreams = shuffleArray(streamInfo)
              this.$store.commit('setPopularStreams', popularStreams.slice(0, 12))
            }
          }
        }
      }
    },
    checkScreenSize: function () {
      this.$store.commit('setSmallInterface', window.innerWidth <= 800)
    },
    checkMenu: function (currentMenu) {
      this.menuItemActive = currentMenu.length > 0
    },
    copyUrl: function () {
      copyToClipboard(window.location.href)
    },
    loadAPI: async function () {
      const accessData = await getAccessToken()
      if (accessData.access_token && accessData.expires_in > 0) {
        this.$store.commit('setAccessToken', accessData.access_token)
        this.getHomePageContent()
      }
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

    // Check if initial streams from querystring
    if (!this.$store.state.streams.length) {
      this.getHomePageContent()
    }
  },
  created: function () {
    // Load stored data and load default data if stored data isn't available
    this.loadStoredData()

    this.loadAPI()

    // Set mobile interface on small screens
    this.checkScreenSize()

    // Get streams from url querystring
    this.getURLStreamParam()
  }
}
