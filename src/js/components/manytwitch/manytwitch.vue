<template>
  <div id="manytwitch">
    <nav>
      <arrow-button
        v-if="options.menuVisible"
        button-title="Toggle Menu"
        direction="left"
        v-on:toggle="toggleMenu"
      />
      <menu-button
        v-else
        button-title="Toggle Menu"
        v-on:toggle="toggleMenu"
      />
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
        <arrow-button
          v-if="options.chatVisible && currentStreams.length"
          direction="right"
          button-title="Toggle Chat"
          v-on:toggle="toggleChat"
        />
        <chat-button
          :disabled="!currentStreams.length"
          v-else
          title="Toggle Chat"
          v-on:toggle="toggleChat"
        />
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
import ArrowButton from './../buttons/arrowButton/ArrowButton.vue'
import ChatButton from './../buttons/chatButton/ChatButton.vue'
import MenuButton from './../buttons/menuButton/MenuButton.vue'

import InputForm from './../inputForm/InputForm.vue'
import MenuContainer from './../menuContainer/MenuContainer.vue'
import Streams from './../streams/Streams.vue'
import Chats from './../chats/Chats.vue'

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
        embedPlayerID: `embed-player-${stream.streamName}-${this.currentStreams.length}`,
        index: this.currentStreams.length
      }
    },
    updateStreams: function (updatedStreams) {
      this.currentStreams = updatedStreams
      this.insertURLParam()
    },
    toggleChat: function () {
      this.options.chatVisible = !this.options.chatVisible
      this.storeOptions()
    },
    toggleMenu: function () {
      this.options.menuVisible = !this.options.menuVisible
      this.storeOptions()
    },
    storeOptions: function() {
      localStorage.setItem('options', JSON.stringify(this.options))
    },
    getStoredOptions: function() {
      const options = localStorage.getItem('options')
      if (options) {
        this.options = JSON.parse(options)
      }
    },
    addStreamToHistory: function (streamName) {
      const stream = {
        streamName: streamName,
        dateAdded: new Date()
      }
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
    getStoredPresets: function () {
      const streamPresets = localStorage.getItem('streamPresets')
      if (streamPresets) {
        this.streamPresets = JSON.parse(streamPresets)
      }
    },
    loadPreset: function (preset) {
      this.currentStreams = []
      for (const stream of preset.streams) {
        this.addStream(stream)
      }
    },
    storePresets: function (presets) {
      this.parsedPresets = presets
      localStorage.setItem('streamPresets', JSON.stringify(presets))
    },
    updatePresets: function (newPresets) {
      this.streamPresets = newPresets
      this.storePresets(this.streamPresets)
    },
    loadHistory: function () {
      const streamHistory = localStorage.getItem('streamHistory')
      if (streamHistory) {
        const parsedHistory = JSON.parse(streamHistory)
        for (const stream of parsedHistory) {
          stream.dateAdded = new Date(stream.dateAdded)
        }
        this.streamHistory = parsedHistory
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
    }
  },
  mounted: function () {
    console.log('Manytwitch Created')
    this.loadHistory()
    if(localStorage.getItem('options')) {
      this.getStoredOptions()
    } else {
      this.storeOptions()
    }
    if(localStorage.getItem('streamPresets')) {
      this.getStoredPresets()
    } else {
      this.storePresets()
    }
    this.getURLParam()
  }
}
</script>