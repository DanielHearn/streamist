<template>
  <div id="manytwitch">
    <nav>
      <button 
        class="button-menu button--green"
        @click="toggleMenu"
        :class="{active: options.menuVisible}"
        title="Toggle Menu">
        <span></span>
      </button>
      <div 
        class="nav-center">
        <h2 class="title">MT</h2>
        <input-form 
        placeholder="Enter a stream"
        v-on:submit="addStreamFromNav"></input-form>
      </div>
      <div
        class="nav-right">
        <fullscreen-button/>
        <div class="button-container">
          <button 
            class="button-menu button--green"
            @click="toggleChat"
            :class="{active: options.chatVisible && currentStreams.length}"
            :disabled="!currentStreams.length"
            title="Toggle Chat">
            <span></span>
          </button>
        </div>
      </div>
    </nav>
    <div id="main">
      <menu-container 
        :options="options"
        :stream-history="streamHistory"
        :current-streams="currentStreams"
        :stream-presets="streamPresets"
        v-on:load-selected-history="loadSelectedHistory"
        v-on:clear-history="clearHistory"
        v-on:update-presets="updatePresets"
        v-on:load-preset="loadPreset">
        </menu-container>
      <streams
        :streams="currentStreams"
        v-on:update-streams="updateStreams"
        :options="options">
        </streams>
      <chats
        :streams="currentStreams"
        :options="options">
        </chats>
    </div>
  </div>
</template>

<script>
import FullscreenButton from './../buttons/fullscreenButton/FullscreenButton.vue'
import InputForm from './../inputForm/InputForm.vue'
import MenuContainer from './../menuContainer/MenuContainer.vue'
import Streams from './../streams/Streams.vue'
import Chats from './../chats/Chats.vue'

export default {
  name: 'manytwitch',
  components: {
    FullscreenButton,
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
      options: {
        chatVisible: true,
        menuVisible: true,
        startMuted: true
      }
    }
  },
  methods: {
    addStreamFromNav: function (e, streamName) {
      e.preventDefault()
      if (!streamName) {
        return false
      }
      console.log(streamName)
      this.addStream(streamName)
    },
    addStream: function (streamName) {
      console.log('Add Stream')
      const stream = this.createStreamObject(streamName)
      this.updateStreams(this.currentStreams.concat([stream]))
      this.addStreamToHistory(streamName)
      this.setHistory(this.streamHistory)
    },
    createStreamObject: function (streamName) {
      const stream = {}
      stream.streamName = streamName
      stream.embedPlayerID = `embed-player-${stream.streamName}-${this.currentStreams.length}`
      stream.index = this.currentStreams.length
      return stream
    },
    updateStreams: function (updatedStreams) {
      this.currentStreams = updatedStreams
      this.insertURLParam()
    },
    toggleChat: function () {
      this.options.chatVisible = !this.options.chatVisible
    },
    toggleMenu: function () {
      console.log(this.options.menuVisible)
      this.options.menuVisible = !this.options.menuVisible
    },
    addStreamToHistory: function (streamName) {
      const stream = {}
      stream.streamName = streamName
      stream.dateAdded = new Date()
      if (this.streamHistory.length < 5) {
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
    loadPresets: function () {
      const streamPresets = localStorage.getItem('streamPresets')
      if (streamPresets) {
        this.streamPresets = JSON.parse(streamPresets)
      }
    },
    loadPreset: function (preset) {
      console.log('Loading Preset', preset)
      this.currentStreams = []
      console.log(preset.streams)
      for (const stream of preset.streams) {
        this.addStream(stream)
      }
    },
    setPresets: function (presets) {
      this.parsedPresets = presets
      console.log('Storing presets')
      localStorage.setItem('streamPresets', JSON.stringify(presets))
    },
    updatePresets: function (newPresets) {
      this.streamPresets = newPresets
      this.setPresets(this.streamPresets)
    },
    loadHistory: function () {
      const streamHistory = localStorage.getItem('streamHistory')
      if (streamHistory) {
        const parsedHistory = JSON.parse(streamHistory)
        for (const stream of parsedHistory) {
          console.log(stream.dateAdded)
          stream.dateAdded = new Date(stream.dateAdded)
        }
        this.streamHistory = parsedHistory
        console.log(this.streamHistory)
      }
    },
    setHistory: function (streamHistory) {
      this.streamHistory = streamHistory
      localStorage.setItem('streamHistory', JSON.stringify(streamHistory))
    },
    insertURLParam: function () {
      let channelString = ''
      for (const channel in this.currentStreams) {
        channelString += String(this.currentStreams[channel].streamName) + ','
      }
      channelString = channelString.replace('undefined', '')
      const newurl = window.location.protocol + '//' + window.location.host + window.location.pathname
      if (channelString) {
        const queryUrl = newurl + '?stream=' + channelString
        window.history.pushState({path: queryUrl}, '', queryUrl)
      } else {
        window.history.pushState({path: newurl}, '', newurl)
      }
    },
    getURLParam: function () {
      const urlParams = new URLSearchParams(window.location.search.substring(1))
      let urlStreams = urlParams.get('stream')
      if (urlStreams !== '' && urlStreams !== null) {
        urlStreams = urlStreams.split(',')
        for (const channel in urlStreams) {
          const newChannel = urlStreams[channel]
          if (newChannel !== '') {
            this.addStream(newChannel)
          }
        }
        return true
      }
      return false
    }
  },
  mounted: function () {
    console.log('Manytwitch Created')
    this.loadHistory()
    this.loadPresets()
    this.getURLParam()
  }
}
</script>