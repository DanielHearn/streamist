import ChatItem from 'Components/chat/chatItem/ChatItem.vue'
import StandardButton from 'Components/inputs/buttons/standardButton/StandardButton.vue'

export default {
  name: 'chats',
  components: {
    ChatItem,
    StandardButton
  },
  props: {
    streams: {
      default: [],
      type: Array,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
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
    },
    filteredStreams: function () {
      const streamNames = []
      // Remove duplicate streams
      return this.streams.filter(stream => {
        if (!streamNames.includes(stream.streamName)) {
          streamNames.push(stream.streamName)
          return stream
        }
      })
    }
  },
  watch: {
    streams: function () {
      this.addInitialChat()
    }
  },
  methods: {
    removeChat: function (removedChat) {
      this.chats = this.chats.filter(chat => chat.index !== removedChat.index)
    },
    loadChat: function (currentChat, newChatName) {
      const chatIndex = this.chats.indexOf(currentChat)
      this.$set(this.chats, chatIndex, this.createChatObject(newChatName))
    },
    addChat: function () {
      if (this.chats.length < this.streams.length) {
        this.chats = this.chats.concat([this.getNewChatName()])
      }
    },
    getNewChatName: function () {
      if (this.streams.length > 1 && this.chats.length > 0) {
        return this.createChatObject(
          this.streams[this.streams.length - 1].streamName
        )
      } else {
        return this.createChatObject(this.streams[0].streamName)
      }
    },
    createChatObject: function (streamName) {
      return {
        streamName: streamName,
        index: this.chats.length
      }
    },
    addInitialChat: function () {
      if (this.streams.length > 0 && this.chats.length === 0) {
        this.addChat()
      }
    }
  },
  mounted: function () {
    this.addInitialChat()
  }
}
