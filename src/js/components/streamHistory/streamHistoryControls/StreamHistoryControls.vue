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
          :small-interface="smallInterface"
          v-on:load-selected-history="loadSelectedHistory"
        ></stream-history-item>
      </list>
    </div>
    <div class="menu-item-row">
      <standard-button
        @click.native="$emit('clear-history')"
        :disabled="!historyAvailable"
        :buttonClasses="'button--secondary'"
      >Clear History</standard-button>
    </div>
  </div>
</template>

<script src="./streamHistoryControls.js"></script>

<style lang="scss">
@import "./streamHistoryControls.scss";
</style>