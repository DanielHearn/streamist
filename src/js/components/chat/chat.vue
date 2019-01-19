<template>
  <div class="stream-chat">
    <select v-model="newChatName" v-on:change="loadChat">
        <option v-for="stream in streams" :key="stream.embedPlayerID">{{ stream.streamName }}</option>
    </select>
    <div class="chat-controls">
      <remove-button v-if="removeAvailable" v-on:remove="remove" title="Remove Chat"></remove-button>
      <refresh-button v-on:refresh="refresh" title="Refresh Chat"></refresh-button>
    </div>
    <iframe frameborder="0" scrolling="no" v-if="chatVisible" :id="'embed-chat-' + chat.streamName" :src="'https://www.twitch.tv/embed/' + chat.streamName + '/chat'"></iframe>
  </div>
</template>

<script>
import RemoveButton from './../buttons/removeButton/RemoveButton.vue'
import RefreshButton from './../buttons/refreshButton/RefreshButton.vue'

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
  template: ``,
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
</script>