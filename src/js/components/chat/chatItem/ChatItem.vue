<template>
  <div class="stream-chat">
    <select v-model="newChatName" v-on:change="loadChat">
      <option>{{ newChatName }}</option>
      <option v-for="stream in filteredStreams" :key="stream.embedPlayerID">{{ stream.streamName }}</option>
    </select>
    <div class="chat-controls">
      <icon-button :iconName="$options.icons.refresh" title="Remove Chat" @click.native="remove"/>
      <icon-button
        v-if="removeAvailable"
        :iconName="$options.icons.remove"
        title="Refresh Chat"
        @click.native="refresh"
      />
    </div>
    <iframe frameborder="0" scrolling="no" v-if="chatVisible" :id="id" :src="src"></iframe>
  </div>
</template>

<script src="./chatItem.js"></script>

<style lang="scss">
@import "./chatItem.scss";
</style>