<template>
  <div class="history-listing">
      <p class="text-sub-heading">{{ history.streamName }}</p>
      <div class="listing-details">
        <p class="sub-text">{{ timeAdded }}</p>
        <standard-button
          @click.native="loadSelectedHistory"
          title="Add Stream">Add</standard-button>
      </div>
  </div>
</template>

<script src="./streamHistoryListing.js"></script>

<style lang="scss">
    @import './streamHistoryListing.scss';
</style>