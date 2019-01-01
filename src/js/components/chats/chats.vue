<template>
  <div class="chats" v-if="chatsAvailable">
    <div class="add-chat-container">
      <button class="button--green button--fill" v-if="streams.length" :disabled="maxChats" @click="addChat" title="Add Chat"> Add Chat </button>
    </div>
    <chat v-for="chat in chats" :streams="streams" :chat="chat" :key="chat.index" :remove-available="removeAvailable" v-on:load-chat="loadChat" v-on:remove-chat="removeChat"></chat>
  </div>
</template>

<script>
export default {
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
}
</script>