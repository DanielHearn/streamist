import RemoveButton from 'Components/inputs/buttons/iconButtons/removeButton/RemoveButton.vue'
import RefreshButton from 'Components/inputs/buttons/iconButtons/refreshButton/RefreshButton.vue'

export default {
  name: 'chat-item',
  components: {
    RemoveButton,
    RefreshButton
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
      required: true
    }
  },
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
      return `https://www.twitch.tv/embed/${this.chat.streamName}/chat`
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
      const data = this
      setTimeout(function () {
        data.chatVisible = true
      }, 10)
    }
  },
  mounted: function () {
    this.chatVisible = true
  }
}
