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

<script src="./chat.js"></script>