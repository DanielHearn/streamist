<template>
  <div class="chats" v-if="chatsAvailable">
    <div class="add-chat-container">
      <button class="button--green button--fill" v-if="streams.length" :disabled="maxChats" @click="addChat" title="Add Chat"> Add Chat </button>
    </div>
    <chat v-for="chat in chats" :streams="streams" :chat="chat" :key="chat.index" :remove-available="removeAvailable" v-on:load-chat="loadChat" v-on:remove-chat="removeChat"></chat>
  </div>
</template>

<script src="./chats.js"></script>


<style lang="scss">
    @import './chats.scss';
</style>