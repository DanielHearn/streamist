<template>
        <standard-button
  <list-item
  v-on:click="loadSelectedHistory"
  :itemName="history.streamName"
  :actionName="'Load'">
    <p class="sub-text">Watched: {{ timeAdded }}</p>
  </list-item>
</template>

<script src="./streamHistoryItem.js"></script>

<style lang="scss">
    @import './streamHistoryItem.scss';
</style>