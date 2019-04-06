<template>
  <div class="chat-list" v-if="chatsAvailable">
    <div class="add-chat-container">
      <standard-button
        class="button--fill"
        v-if="streams.length"
        :disabled="maxChats"
        @click.native="addChat"
        title="Add Chat"
      >Add Chat</standard-button>
    </div>
    <chat-item
      v-for="chat in chats"
      :key="chat.index"
      :streams="filteredStreams"
      :chat="chat"
      :remove-available="removeAvailable"
      v-on:load-chat="loadChat"
      v-on:remove-chat="removeChat"
    ></chat-item>
  </div>
</template>

<script src="./chatList.js"></script>


<style lang="scss">
@import "./chatList.scss";
</style>