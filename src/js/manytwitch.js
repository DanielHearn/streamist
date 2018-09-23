Vue.component('remove-button', {
  template: `<button class="button--green material-icons" @click="remove">delete</button>`,
  methods: {
    remove: function () {
      this.$emit('remove')
    }
  }
})

Vue.component('refresh-button', {
  template: `<button class="button--green material-icons" @click="refresh">refresh</button>`,
  methods: {
    refresh: function () {
      this.$emit('refresh')
    }
  }
})

Vue.component('edit-button', {
  template: `<button class="button--green material-icons" @click="edit">edit</button>`,
  methods: {
    edit: function () {
      this.$emit('edit')
    }
  }
})

Vue.component('load-button', {
  template: `<button class="button--green material-icons" @click="load">play_arrow</button>`,
  methods: {
    load: function () {
      this.$emit('load')
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
              <span class="material-icons handle text--white">drag_handle</span>  
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
  props: ['stream', 'options'],
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
  data: function () {
    return {
      orderedStreams: this.streams.slice()
    }
  },
  watch: {
    'streams': function () {
      console.log('update orderedstreams from streams')
      if (this.orderedStreams !== this.streams) {
        this.orderedStreams = this.streams.slice()
      }
    },
    'orderedStreams': function () {
      console.log('Ordered Streams:', this.orderedStreams)
      this.$emit('update-streams', this.orderedStreams)
    }
  },
  template: `<draggable 
              class="streams"
              v-model="orderedStreams" 
              @start="drag=true" 
              @end="drag=false"
              :options="{ghostClass:'ghost'}">
                <stream class="draggable" v-for="stream in orderedStreams" :key="stream.embedPlayerID" :stream="stream" :options="options" v-on:remove-stream="removeStream"></stream>
              </draggable>`,
  methods: {
    removeStream: function (removedStream) {
      // Remove stream with matching streamIndex from currentStreams
      const newStreams = this.orderedStreams.filter(stream => stream !== removedStream)
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
                  <option v-for="stream in streams" :key="stream.embedPlayerID">{{ stream.streamName }}</option>
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
    'streams': function () {
      if (this.streams.length > 0 && this.chats.length === 0) {
        this.addChat()
      }
    }
  },
  template: `<div class="chats" v-if="chatsAvailable">
              <div class="add-chat-container">
                <button class="button--green button--fill" v-if="streams.length" :disabled="maxChats" @click="addChat"> Add Chat </button>
              </div>
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
      // Show time since add
      // TODO: Add own function to achieve the same
      return moment(this.stream.dateAdded).fromNow()
    }
  },
  template: `<div class="history-listing">
                  <p class="text-sub-heading">{{ stream.streamName }}</p>
                  <div class="listing-details">
                    <p class="sub-text">Added: {{ timeAdded }}</p>
                    <button class="button--green" @click="loadSelectedHistory">Add</button>
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
      return this.streamHistory.slice().reverse()
    },
    historyAvailable: function () {
      return this.streamHistory.length > 0
    }
  },
  template: `<div class="stream-history" v-if="streamHistory">
              <p class="text" v-if="!historyAvailable">No streams in history</p>
              <ul class="history-list">
                <stream-history-listing 
                    v-for="stream in orderedHistory" 
                    :stream="stream" 
                    :current-date="currentDate"
                    v-on:load-selected-history="loadSelectedHistory"
                    ></stream-history-listing>
              </ul>
              <button class="button--green" @click="clearHistory" :disabled="!historyAvailable">Clear History</butto>
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

Vue.component('preset-listing', {
  props: ['preset'],
  data: function () {
    return {
      orderedStreams: this.preset.streams,
      newPresetStreamName: '',
      presetName: this.preset.name,
      editMode: false
    }
  },
  watch: {
    'presetName': function () {
      const tempPreset = this.preset
      tempPreset.name = this.presetName
      this.$emit('update-preset', tempPreset)
    },
    'preset.streams': function () {
      this.orderedStreams = this.preset.streams
    },
    'orderedStreams': function () {
      const tempPreset = this.preset
      tempPreset.streams = this.orderedStreams
      this.$emit('update-preset', tempPreset)
    }
  },
  template: `<li>
              <div>
                <input type="text" contenteditable="true" v-model="presetName"></input>
                <load-button v-on:load="loadPreset"></load-button>
                <edit-button v-on:edit="toggleEditMode"></edit-button>
                <remove-button v-on:remove="deletePreset"></remove-button>
              </div>
              <div v-if="editMode">
                <form 
                  class="list-add"
                  name="newPresetStream" 
                  v-on:submit.prevent="newPresetStream">
                  <input 
                    type="text"
                    name="newPresetStreamInput"
                    required="required"
                    placeholder="Stream Name"
                    v-model="newPresetStreamName">
                  <button class="button--green" type="submit">Add Stream</button>
                </form>  
                <ul>
                  <draggable 
                    v-model="orderedStreams" 
                    @start="drag=true" 
                    @end="drag=false"
                    :options="{ghostClass:'ghost'}">
                    <li
                      class="draggable"
                      v-for="(stream, index) in orderedStreams"
                      :stream="stream">
                      <span class="material-icons handle text--green">drag_handle</span>
                      <p> {{ stream }}</p> 
                      <remove-button v-on:remove="deleteStreamFromPreset(index)"></remove-button>
                    </li>
                  </draggable>
                </ul>
              </div>
            </li>`,
  methods: {
    deleteStreamFromPreset: function (index) {
      const tempPreset = this.preset
      tempPreset.streams.splice(index, 1)
      this.$emit('update-preset', tempPreset)
    },
    loadPreset: function () {
      this.$emit('load-preset', this.preset)
    },
    deletePreset: function () {
      this.$emit('delete-preset', this.preset)
    },
    toggleEditMode: function () {
      this.editMode = !this.editMode
    },
    newPresetStream: function (e) {
      e.preventDefault()
      if (!this.newPresetStreamName) {
        return false
      }
      const newPresetStreamName = this.newPresetStreamName
      this.newPresetStreamName = ''
      const updatedPreset = this.preset
      updatedPreset.streams = updatedPreset.streams.concat([newPresetStreamName])
      this.$emit('update-preset', updatedPreset)
    }
  }
})

// TODO: Hide other edits on edit open
Vue.component('preset-options', {
  props: ['streamPresets', 'currentStreams'],
  data: function () {
    return {
      newPresetName: '',
      importPresetsOpened: false,
      importedPresets: JSON.stringify(this.streamPresets)
    }
  },
  computed: {
    noStreams: function () {
      return this.currentStreams.length === 0
    },
    presetsDisabled: function () {
      return this.streamPresets.length === 0
    },
    stringifiedPresets: function () {
      return JSON.stringify(this.streamPresets)
    }
  },
  template: `<div class="option">
              <p class="text-heading">Presets</p>
              <form class="list-add"
                name="newPreset" 
                v-on:submit.prevent="createPreset">
                <input type="text"
                  name="newPresetInput"
                  required="required"
                  placeholder="Preset Name"
                  v-model="newPresetName">
                <button class="button--green" type="submit">Create</button>
              </form>  
              <p class="text" v-if="presetsDisabled">No presets saved</p>
              <ul class="preset-list">
                <preset-listing
                  v-for="preset in streamPresets"
                  :preset="preset"
                  v-on:load-preset="loadPreset"
                  v-on:update-preset="updatePreset"
                  v-on:delete-preset="deletePreset">
                </preset-listing>
              </ul>
              <button class="button--green" @click="saveCurrentAsPreset" :disabled="noStreams">Save Streams as Preset</button>
              <button class="button--green" @click="clearPresets" :disabled="presetsDisabled">Clear Presets</button>
              <button class="button--green" @click="exportPresets" :disabled="presetsDisabled">Export Presets</button>
              <button class="button--green" @click="importPresets">Import Presets</button>
              <div :class="{hidden: !importPresetsOpened}">
                <textarea v-model="importedPresets"></textarea>
                <button class="button--green" @click="applyImportedPresets">Apply Presets</button>
              </div>
            </div>`,
  methods: {
    copyToClipboard: function (str) {
      const el = document.createElement('textarea') // Create a <textarea> element
      el.value = str // Set its value to the string that you want copied
      el.setAttribute('readonly', '') // Make it readonly to be tamper-proof
      el.style.position = 'absolute'
      el.style.left = '-9999px' // Move outside the screen to make it invisible
      document.body.appendChild(el) // Append the <textarea> element to the HTML document
      const selected =
        document.getSelection().rangeCount > 0 // Check if there is any content selected previously
          ? document.getSelection().getRangeAt(0) // Store selection if found
          : false // Mark as false to know no selection existed before
      el.select() // Select the <textarea> content
      document.execCommand('copy') // Copy - only works as a result of a user action (e.g. click events)
      document.body.removeChild(el) // Remove the <textarea> element
      if (selected) { // If a selection existed before copying
        document.getSelection().removeAllRanges() // Unselect everything on the HTML document
        document.getSelection().addRange(selected) // Restore the original selection
      }
    },
    applyImportedPresets: function () {
      console.log('Apply Presets')
      // TODO: Add more validation, array of objects
      // TODO: Handle indexing here, change to be correctly ordered
      try {
        // TODO: Notification popup saying applied presets
        this.updatePresets(JSON.parse(this.importedPresets))
        this.importPresetsOpened = false
      } catch (e) {
        // TODO: Notification error
      }
    },
    importPresets: function () {
      console.log('Import Presets')
      this.importPresetsOpened = !this.importPresetsOpened
    },
    exportPresets: function () {
      console.log('Export Presets')
      this.copyToClipboard(this.stringifiedPresets)
      // TODO: Notification popup saying exported to clipboard
    },
    deletePreset: function (removedPreset) {
      const newPresets = this.streamPresets.filter(preset => preset.index !== removedPreset.index)
      this.updatePresets(newPresets)
    },
    loadPreset: function (preset) {
      this.$emit('load-preset', preset)
    },
    saveCurrentAsPreset: function () {
      const presetName = `Preset ${this.streamPresets.length + 1}`
      const newPreset = this.createEmptyPreset(presetName, [])
      newPreset.streams = this.currentStreams.map(stream => stream.streamName)
      const newPresets = this.streamPresets.concat(newPreset)
      this.updatePresets(newPresets)
    },
    createPresetObject: function (presetName, presetStreams) {
      const newPreset = {
        name: presetName,
        streams: presetStreams,
        index: this.streamPresets.length
      }
      return newPreset
    },
    createEmptyPreset: function (presetName) {
      return this.createPresetObject(presetName, [])
    },
    updatePreset: function (updatedPreset) {
      const tempPresets = this.streamPresets
      for (const preset in tempPresets) {
        if (preset.index === updatedPreset.index) {
          preset.name = updatedPreset.name
          preset.streams = updatedPreset.streams
        }
      }
      this.updatePresets(tempPresets)
    },
    updatePresets: function (newPresets) {
      this.$emit('update-presets', newPresets)
    },
    createPreset: function (e) {
      e.preventDefault()
      if (!this.newPresetName) {
        return false
      }
      const presetName = this.newPresetName
      this.newPresetName = ''
      console.log(this.streamPresets)
      const newPreset = this.createEmptyPreset(presetName)
      const newPresets = this.streamPresets.concat(newPreset)
      console.log(newPresets)
      this.updatePresets(newPresets)
    },
    clearPresets: function () {
      this.updatePresets([])
    }
  }
})

Vue.component('setting-options', {
  template: `<div class="option">
              <p class="text-heading">Settings</p>
            </div>`
})

Vue.component('about', {
  template: `<div class="option">
              <p class="text-heading">About</p>
            </div>`
})

Vue.component('menu-container', {
  props: ['options', 'currentStreams', 'streamHistory', 'streamPresets'],
  data: function () {
    return {
      currentOptionCat: ''
    }
  },
  template: `<div class="menu-container" :class="{visible: options.menuVisible}">
              <div class="menu">
                <div class="menu-content">
                  <button class="button--purple" @click="loadOptionCat('History')" :class="{active: currentOptionCat === 'History'}">
                    <i class="material-icons">history</i>
                    <p>History</p>
                  </button>
                  <button class="button--purple" @click="loadOptionCat('Presets')" :class="{active: currentOptionCat === 'Presets'}">
                    <i class="material-icons">view_module</i>
                    <p>Presets</p>
                  </button>
                  <button class="button--purple" @click="loadOptionCat('Settings')" :class="{active: currentOptionCat === 'Settings'}">
                    <i class="material-icons">settings</i>
                    <p>Settings</p>
                  </button>
                  <button class="button--purple" @click="loadOptionCat('About')" :class="{active: currentOptionCat === 'About'}">
                    <i class="material-icons">info</i>
                    <p>About</p>
                  </button>
                </div>
              </div>
              <div class="menu-options">
                <history-options 
                  v-if="currentOptionCat === 'History'" 
                  :stream-history="streamHistory" 
                  v-on:load-selected-history="loadSelectedHistory"
                  v-on:clear-history="clearHistory"
                ></history-options>
                <preset-options 
                  v-if="currentOptionCat === 'Presets'"
                  :stream-presets="streamPresets"
                  :current-streams="currentStreams"
                  v-on:update-presets="updatePresets"
                  v-on:load-preset="loadPreset"
                ></preset-options>
                <setting-options
                  v-if="currentOptionCat === 'Settings'"
                ></setting-options>
                <about
                  v-if="currentOptionCat === 'About'"
                ></about>
              <div>
            </div>`,
  methods: {
    loadPreset: function (preset) {
      this.$emit('load-preset', preset)
    },
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
    },
    updatePresets: function (newPresets) {
      this.$emit('update-presets', newPresets)
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
      streamPresets: [],
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
    toggleFullscreen: function () {
      if (screenfull.enabled) {
        screenfull.toggle()
      }
    },
    insertURLParam: function () {
      let channelString = ''
      for (const channel in this.currentStreams) {
        channelString += String(this.currentStreams[channel].streamName) + ','
      }
      channelString = channelString.replace('undefined', '')
      const newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?stream=' + channelString
      window.history.pushState({path: newurl}, '', newurl)
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
})
