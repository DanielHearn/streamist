<template>
  <div class="history-listing">
      <p class="text-sub-heading">{{ stream.streamName }}</p>
      <div class="listing-details">
        <p class="sub-text">Added: {{ timeAdded }}</p>
        <button class="button--green" @click="loadSelectedHistory" title="Add Stream">Add</button>
      </div>
  </div>
</template>

<script src="./streamHistoryListing.js"></script>