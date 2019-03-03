<template>
  <div class="history-listing">
      <div class="listing-details">
        <p class="text-sub-heading">{{ history.streamName }}</p>
        <standard-button
          @click.native="loadSelectedHistory"
          title="Add Stream">Add</standard-button>
      </div>
      <p class="sub-text">{{ timeAdded }}</p>
  </div>
</template>

<script src="./streamHistoryListing.js"></script>

<style lang="scss">
    @import './streamHistoryListing.scss';
</style>