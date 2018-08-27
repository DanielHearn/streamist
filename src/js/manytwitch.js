Vue.component('remove-button', {
  template: `<button @click="remove">Remove</button>`,
  methods: {
    remove: function () {
      this.$emit('remove')
    }
  }
})

Vue.component('refresh-button', {
  template: `<button @click="refresh">Refresh</button>`,
  methods: {
    refresh: function () {
      this.$emit('refresh')
    }
  }
})

Vue.component('stream-controls', {
  props: ['stream'],
  computed: {
    streamUrl: function () {
      return `https://www.twitch.tv/${this.stream.streamName}`
    }
  },
  template: `<div class="stream-controls">
              <a class="url" :href="streamUrl" target="_blank">{{ stream.streamName }}</a>
              <remove-button v-on:remove="remove"></remove-button>
              <refresh-button v-on:refresh="refresh"></refresh-button>
             </div>`,
  methods: {
    remove: function () {
      this.$emit('remove')
    },
    refresh: function () {
      this.$emit('refresh')
    }
  }
})

Vue.component('stream', {
  props: ['streams', 'stream', 'options'],
  data: function () {
    return {
      playerEmbed: {},
      player: {}
    }
  },
  template: `<div class="stream">
              <stream-controls :stream="stream" v-on:remove="remove" v-on:refresh="refresh"></stream-controls>
              <div class="stream-main">
                <div class="stream-player" :id="stream.embedPlayerID"></div>
              </div>
            </div>`,
  methods: {
    remove: function () {
      this.$emit('remove-stream', this.stream)
    },
    refresh: function () {
      const streamPlayer = document.querySelector(`#${this.stream.embedPlayerID}`)
      streamPlayer.innerHTML = ''
      this.displayStream()
    },
    displayStream: function () {
      console.log('Display stream: ' + this.stream.streamName)
      const options = {
        channel: this.stream.streamName,
        layout: 'video',
        allowfullscreen: false,
        theme: 'dark'
      }
      this.playerEmbed = new Twitch.Embed(this.stream.embedPlayerID, options)
      this.player = this.playerEmbed.getPlayer()
    }
  },
  created: function () {
    this.currentStream = this.stream
  },
  mounted: function () {
    this.displayStream()
  }
})

Vue.component('streams', {
  props: ['streams', 'options'],
  template: `<div class="streams">
              <stream v-for="stream in streams" :key="stream.index" :stream="stream" :streams="streams" :options="options" v-on:remove-stream="removeStream"></stream>
             </div>`,
  methods: {
    removeStream: function (removedStream) {
      // Remove stream with matching streamIndex from currentStreams
      const newStreams = this.streams.filter(stream => stream !== removedStream)
      this.$emit('update-streams', newStreams)
    }
  },
  mounted: function () {
  }
})

Vue.component('chat', {
  props: ['streams', 'chat', 'removeAvailable'],
  data: function () {
    return {
      newChatName: this.chat.streamName,
      chatVisible: false
    }
  },
  template: `<div class="stream-chat">
              <select v-model="newChatName" v-on:change="loadChat">
                  <option v-for="stream in streams">{{ stream.streamName }}</option>
              </select>
              <div class="chat-controls">
                <remove-button v-if="removeAvailable" v-on:remove="remove"></remove-button>
                <refresh-button v-on:refresh="refresh"></refresh-button>
              </div>
              <iframe frameborder="0" scrolling="no" v-if="chatVisible" :id="'embed-chat-' + chat.streamName" :src="'https://www.twitch.tv/embed/' + chat.streamName + '/chat'"></iframe>
             </div>`,
  methods: {
    loadChat: function () {
      this.$emit('load-chat', this.chat, this.newChatName)
    },
    remove: function () {
      this.$emit('remove-chat', this.chat)
    },
    refresh: function () {
      this.chatVisible = false
      const data = this
      setTimeout(function () {
        data.chatVisible = true
      }, 10)
    }
  },
  mounted: function () {
    this.chatVisible = true
  }
})

Vue.component('chats', {
  props: ['streams', 'options'],
  data: function () {
    return {
      chats: []
    }
  },
  computed: {
    maxChats: function () {
      return this.streams.length === this.chats.length
    },
    chatsAvailable: function () {
      return this.streams.length >= 1 && this.options.chatVisible
    },
    removeAvailable: function () {
      return this.chats.length > 1
    }
  },
  watch: {
    'streams' () {
      if (this.streams.length === 1) {
        this.addChat()
      }
    }
  },
  template: `<div class="chats" v-if="chatsAvailable">
              <button v-if="streams.length" :disabled="maxChats" @click="addChat"> Add Chat </button>
              <chat v-for="chat in chats" :streams="streams" :chat="chat" :key="chat.index" :remove-available="removeAvailable" v-on:load-chat="loadChat" v-on:remove-chat="removeChat"></chat>
             </div>`,
  methods: {
    removeChat: function (removedChat) {
      const newChats = this.chats.filter(chat => chat.index !== removedChat.index)
      this.chats = newChats
    },
    loadChat: function (currentChat, newChatName) {
      const chatIndex = this.chats.indexOf(currentChat)
      Vue.set(this.chats, chatIndex, this.createChatObject(newChatName))
    },
    addChat: function () {
      let chat = this.getNewChatName()
      if (this.chats.length < this.streams.length) {
        this.chats = this.chats.concat([chat])
      }
    },
    getNewChatName: function () {
      if (this.streams.length > 1 && this.chats.length > 0) {
        return this.createChatObject(this.streams[this.streams.length - 1].streamName)
      } else {
        return this.createChatObject(this.streams[0].streamName)
      }
    },
    createChatObject: function (streamName) {
      const chat = {}
      chat.streamName = streamName
      chat.index = this.chats.length
      return chat
    }
  }
})

Vue.component('stream-history-listing', {
  props: ['stream', 'currentDate'],
  computed: {
    timeAdded: function () {
      return moment(this.stream.dateAdded).fromNow()
    }
  },
  template: `<div class="history-listing">
                  <p class="text-sub-heading">{{ stream.streamName }}</p>
                  <div class="listing-details">
                    <p>Added: {{ timeAdded }}</p>
                    <button @click="loadSelectedHistory">Add Stream</button>
                  </div>
              </div>`,
  methods: {
    loadSelectedHistory: function () {
      this.$emit('load-selected-history', this.stream.streamName)
    }
  }
})

Vue.component('stream-history-controls', {
  props: ['streamHistory'],
  data: function () {
    return {
      selectedHistory: '',
      currentDate: new Date()
    }
  },
  computed: {
    orderedHistory: function () {
      console.log(this.streamHistory)
      return this.streamHistory.reverse()
    }
  },
  template: `<div class="stream-history" v-if="streamHistory">
              <ul class="history-list">
                <stream-history-listing 
                    v-for="stream in orderedHistory" 
                    :stream="stream" 
                    :current-date="currentDate"
                    v-on:load-selected-history="loadSelectedHistory"
                    ></stream-history-listing>
              </ul>
              <button @click="clearHistory">Clear History</butto>
             </div>`,
  methods: {
    loadSelectedHistory: function (streamName) {
      this.$emit('load-selected-history', streamName)
    },
    clearHistory: function () {
      this.$emit('clear-history')
    }
  }
})

Vue.component('history-options', {
  props: ['streamHistory'],
  template: `<div class="option">
              <p class="text-heading">Stream History</p>
              <stream-history-controls :stream-history="streamHistory" v-on:load-selected-history="loadSelectedHistory" v-on:clear-history="clearHistory"></stream-history-controls>
            </div>`,
  methods: {
    loadSelectedHistory: function (streamName) {
      this.$emit('load-selected-history', streamName)
    },
    clearHistory: function () {
      this.$emit('clear-history')
    }
  }
})

Vue.component('preset-options', {
  template: `<div class="option">
              <p class="text-heading">Presets</p>
            </div>`
})

Vue.component('setting-options', {
  template: `<div class="option">
              <p class="text-heading">Settings</p>
            </div>`
})

Vue.component('menu-container', {
  props: ['options', 'streamHistory'],
  data: function () {
    return {
      currentOptionCat: ''
    }
  },
  template: `<div class="menu-container" :class="{visible: options.menuVisible}">
              <div class="menu">
                <div class="menu-content">
                  <button @click="loadOptionCat('History')">
                    <i class="material-icons">history</i>
                    <p>History</p>
                  </button>
                  <button @click="loadOptionCat('Presets')">
                    <i class="material-icons">view_module</i>
                    <p>Presets</p>
                  </button>
                  <button @click="loadOptionCat('Settings')">
                    <i class="material-icons">settings</i>
                    <p>Settings</p>
                  </button>
                </div>
              </div>
              <div class="menu-options">
                <history-options v-if="currentOptionCat === 'History'"                         :stream-history="streamHistory" v-on:load-selected-history="loadSelectedHistory"
                v-on:clear-history="clearHistory"></history-options>
                <preset-options v-if="currentOptionCat === 'Presets'"></preset-options>
                <setting-options v-if="currentOptionCat === 'Settings'"></setting-options>
              <div>
            </div>`,
  methods: {
    loadOptionCat: function (cat) {
      if (cat === this.currentOptionCat) {
        this.currentOptionCat = ''
      } else {
        this.currentOptionCat = cat
      }
    },
    loadSelectedHistory: function (streamName) {
      this.$emit('load-selected-history', streamName)
    },
    clearHistory: function () {
      this.$emit('clear-history')
    }
  }
})

const manytwitch = new Vue({
  el: '#manytwitch',
  data: function () {
    return {
      newStreamName: '',
      currentStreams: [],
      streamHistory: [],
      options: {
        chatVisible: true,
        menuVisible: true,
        startMuted: true
      }
    }
  },
  methods: {
    addStreamFromNav: function (e) {
      e.preventDefault()
      if (!this.newStreamName) {
        return false
      }
      const streamName = this.newStreamName
      this.newStreamName = ''
      console.log(streamName)
      this.addStream(streamName)
    },
    addStream: function (streamName) {
      console.log('Add Stream')
      const stream = this.createStreamObject(streamName)
      this.currentStreams = this.currentStreams.concat([stream])
      console.log(this.streamHistory)
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
    loadHistory: function () {
      const streamHistory = localStorage.getItem('streamHistory')
      if (streamHistory) {
        const parsedHistory = JSON.parse(streamHistory)
        for (let stream of parsedHistory) {
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
    }
  },
  mounted: function () {
    console.log('Manytwitch Created')
    this.loadHistory()
  }
})
