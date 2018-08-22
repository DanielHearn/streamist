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
              <a class="url" v-bind:href="streamUrl" target="_blank">{{ stream.streamName }}</a>
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
  props: ['stream'],
  template: `<div class="stream">
              <stream-controls v-bind:stream="stream" v-on:remove="remove" v-on:refresh="refresh"></stream-controls>
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
      new Twitch.Embed(this.stream.embedPlayerID, {
        channel: this.stream.streamName,
        layout: 'video'
      })
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
  props: ['streams'],
  template: `<div class="streams">
              <stream v-for="stream in streams" :key="stream.index" v-bind:stream="stream" v-on:remove-stream="removeStream"></stream>
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
      newChatName: this.chat,
      chatVisible: false
    }
  },
  template: `<div class="stream-chat">
              <select v-model="newChatName" v-on:change="loadChat">
                  <option v-for="stream in streams">{{ stream.streamName }}</option>
              </select>
              <remove-button v-if="removeAvailable" v-on:remove="remove"></remove-button>
              <iframe frameborder="0" scrolling="no" :id="'embed-chat-' + chat" :src="'https://www.twitch.tv/embed/' + chat + '/chat'"></iframe>
             </div>`,
  methods: {
    loadChat: function () {
      this.$emit('load-chat', this.chat, this.newChatName)
    },
    remove: function () {
      this.$emit('remove-chat', this.chat)
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
              <chat v-for="chat in chats" :streams="streams" :chat="chat" :remove-available="removeAvailable" v-on:load-chat="loadChat" v-on:remove-chat="removeChat"></chat>
             </div>`,
  methods: {
    removeChat: function (removedChat) {
      console.log('Remove chat: ' + removedChat)
      /* console.log(this.chats)
      this.chats.forEach(chat => console.log(chat.id))
      const newChats = this.chats.filter(chat => chat.id !== removedChat.id)
      this.chats = newChats
      console.log(this.chats) */
    },
    loadChat: function (currentChat, newChatName) {
      console.log(currentChat + ', ' + newChatName)
      if (currentChat !== newChatName) {
        if (!(newChatName in this.chats)) {
          console.log('Loaded: ' + newChatName)
          console.log(this.chats)
          const chatIndex = this.chats.indexOf(currentChat)
          Vue.set(this.chats, chatIndex, newChatName)
          console.log(this.chats)
        }
      }
    },
    addChat: function () {
      let streamName
      if (this.streams.length > 1 && this.chats.length > 0) {
        streamName = this.streams[this.streams.length - 1].streamName
      } else {
        streamName = this.streams[0].streamName
      }
      console.log('Added chat: ' + streamName)
      if (this.chats.length < this.streams.length) {
        this.chats = this.chats.concat([streamName])
      }
    }
  }
})

Vue.component('menu-container', {
  props: ['options'],
  template: `<div class="menu" v-bind:class="{visible: options.menuVisible}">
              <div class="menu-content">
                <p class="menu-title">Settings</p>
              </div>
            </div>`
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
        menuVisible: false
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
