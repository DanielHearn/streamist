<template>
  <div class="stream-history" v-if="streamHistory">
    <p class="text" v-if="!historyAvailable">No streams in history</p>
    <ul class="history-list">
      <stream-history-listing 
          v-for="stream in orderedHistory" 
          :stream="stream" 
          :current-date="currentDate"
          v-on:load-selected-history="loadSelectedHistory"
          ></stream-history-listing>
    </ul>
    <button class="button--green" @click="clearHistory" :disabled="!historyAvailable">Clear History</button>
  </div>
</template>

<script src="./streamHistoryControls.js"></script>
