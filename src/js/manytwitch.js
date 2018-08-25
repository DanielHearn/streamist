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

Vue.component('stream-history', {
  props: ['history'],
  data: function () {
    return {
      selectedHistory: ''
    }
  },
  computed: {
    historyDisabled: function () {
      return this.history.length === 0
    },
    orderedHistory: function () {
      return this.history.reverse()
    }
  },
  template: `<div class="stream-history" v-if="history">
              <select v-model="selectedHistory" v-on:change="loadSelectedHistory" :disabled="historyDisabled">
                <option v-for="stream in orderedHistory">{{ stream }}</option>
              </select>
             </div>`,
  methods: {
    loadSelectedHistory: function () {
      console.log('Load', this.selectedHistory)
      this.$emit('load-selected-history', this.selectedHistory)
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

Vue.component('history-options', {
  template: `<div class="option">
              <p>HISTORY OPTIONS<p>
            </div>`
})

Vue.component('preset-options', {
  template: `<div class="option">
              <p>PRESET OPTIONS<p>
            </div>`
})

Vue.component('setting-options', {
  template: `<div class="option">
              <p>SETTINGS<p>
            </div>`
})

Vue.component('menu-container', {
  props: ['options'],
  data: function () {
    return {
      optionCats: ['History', 'Presets', 'Settings'],
      currentOptionCat: ''
    }
  },
  template: `<div class="menu-container" :class="{visible: options.menuVisible}">
              <div class="menu">
                <div class="menu-content">
                  <button v-for="cat in optionCats" :key="cat" @click="loadOptionCat(cat)">{{ cat }}</button>
                </div>
              </div>
              <div class="menu-options">
                <history-options v-if="currentOptionCat === 'History'"></history-options>
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
    }
  }
})

const manytwitch = new Vue({
  el: '#manytwitch',
  data: function () {
    return {
      newStreamName: '',
      currentStreams: [],
      history: [],
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
      console.log(this.history)
      if (this.history.length < 5) {
        this.history = this.history.concat([streamName])
      } else {
        const newHistory = this.history.slice(1, this.history.length).concat([streamName])
        this.history = newHistory
      }
      this.setHistory()
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
    loadSelectedHistory: function (streamName) {
      console.log(streamName)
      this.addStream(streamName)
    },
    loadHistory: function () {
      const history = localStorage.getItem('streamHistory')
      if (history) {
        this.history = history.replace(/^\[|\]$/g, '').replace(/(['"])/g, '').split(',')
        console.log(this.history)
      }
    },
    setHistory: function () {
      localStorage.setItem('streamHistory', JSON.stringify(this.history))
      console.log(localStorage.getItem('streamHistory'))
    }
  },
  mounted: function () {
    console.log('Manytwitch Created')
    this.loadHistory()
  }
})
