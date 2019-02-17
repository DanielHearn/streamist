<template>
  <div class="chats" v-if="chatsAvailable">
    <div class="add-chat-container">
      <standard-button
        class="button--fill"
        v-if="streams.length"
        :disabled="maxChats"
        @click.native="addChat"
        title="Add Chat">Add Chat</standard-button>
    </div>
    <chat v-for="chat in chats" :streams="streams" :chat="chat" :key="chat.index" :remove-available="removeAvailable" v-on:load-chat="loadChat" v-on:remove-chat="removeChat"></chat>
  </div>
</template>

<script src="./chats.js"></script>


<style lang="scss">
    @import './chats.scss';
</style>