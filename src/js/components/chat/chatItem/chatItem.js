import IconButton from './../../inputs/buttons/iconButton/IconButton.vue'

import Icons from './../../../icons'

export default {
  name: 'chat-item',
  components: {
    IconButton
  },
  props: {
    streams: {
      default: [],
      type: Array,
      required: true
    },
    chat: {
      type: Object,
      required: true
    },
    removeAvailable: {
      default: false,
      type: Boolean,
      required: false
    }
  },
  icons: Icons,
  data: function () {
    return {
      newChatName: this.chat.streamName,
      chatVisible: false
    }
  },
  computed: {
    id: function () {
      return `embed-chat-${this.chat.streamName}`
    },
    src: function () {
      return `https://www.twitch.tv/embed/${this.chat.streamName}/chat?parent=danielhearn.co.uk`
    },
    filteredStreams: function () {
      return this.streams.filter(stream => {
        return stream.streamName !== this.newChatName
      })
    }
  },
  methods: {
    loadChat: function () {
      this.$emit('load-chat', this.chat, this.newChatName)
    },
    remove: function () {
      this.$emit('remove-chat', this.chat)
    },
    refresh: function () {
      this.chatVisible = false

      setTimeout(() => {
        this.chatVisible = true
      }, 10)
    }
  },
  mounted: function () {
    this.chatVisible = true
  }
}
