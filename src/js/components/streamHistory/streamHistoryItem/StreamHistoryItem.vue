<template>
  <list-item @click="loadSelectedHistory" :itemName="history.streamName" :actionName="'Add'">
    <p class="sub-text">Watched: {{ timeAdded }}</p>
  </list-item>
</template>

<script src="./streamHistoryItem.js"></script>

<style lang="scss">
@import "./streamHistoryItem.scss";
</style>