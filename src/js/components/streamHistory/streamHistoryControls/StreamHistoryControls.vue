<template>
  <div class="stream-history" v-if="streamHistory">
    <div class="menu-item-row">
      <p class="text" v-if="!historyAvailable">No channels in your history.</p>
      <list>
        <stream-history-item
          v-for="history in orderedHistory"
          :key="history.id"
          :history="history"
          :current-date="currentDate"
        ></stream-history-item>
      </list>
    </div>
  </div>
</template>

<script src="./streamHistoryControls.js"></script>

<style lang="scss">
@import "./streamHistoryControls.scss";
</style>