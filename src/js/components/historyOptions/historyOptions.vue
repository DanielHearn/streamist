<template>
  <div class="option">
    <div class="option-header">
      <p class="text-heading">Stream History</p>
      <close-button v-on:close="closeOptions" title="Close Settings"></close-button>
    </div>
    <div class="option-content">
      <stream-history-controls :stream-history="streamHistory" v-on:load-selected-history="loadSelectedHistory" v-on:clear-history="clearHistory"></stream-history-controls>
    </div>
  </div>
</template>

<script src="./historyOptions.js"></script>