<template>
  <div class="stream-history" v-if="streamHistory">
    <div class="menu-item-row">
      <p class="text" v-if="!historyAvailable">No streams in history</p>
      <ul class="history-list">
        <stream-history-listing 
            v-for="history in orderedHistory" 
            :key="history.id"
            :history="history" 
            :current-date="currentDate"
            v-on:load-selected-history="loadSelectedHistory"
            ></stream-history-listing>
      </ul>
    </div>
    <div class="menu-item-row">
      <standard-button
        @click.native="$emit('clear-history')"
        :disabled="!historyAvailable">Clear History</standard-button>
    </div>
  </div>
</template>

<script src="./streamHistoryControls.js"></script>

<style lang="scss">
    @import './streamHistoryControls.scss';
</style>