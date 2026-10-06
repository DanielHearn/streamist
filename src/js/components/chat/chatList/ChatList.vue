<template>
  <div class="chat-list" v-if="chatsVisible">
    <div class="add-chat-container" v-if="streams.length > 1">
      <standard-button
        class="button--fill"
        :disabled="maxChats"
        @click.native="addChat"
        title="Add Chat"
        >Add Chat</standard-button
      >
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
@import './chatList.scss';
</style>
