import RemoveButton from 'Components/buttons/removeButton/RemoveButton.vue'
import RefreshButton from 'Components/buttons/refreshButton/RefreshButton.vue'

export default {
  name: 'chat',
  components: {
    RemoveButton,
    RefreshButton
  },
  props: ['streams', 'chat', 'removeAvailable'],
  data: function () {
    return {
      newChatName: this.chat.streamName,
      chatVisible: false
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
