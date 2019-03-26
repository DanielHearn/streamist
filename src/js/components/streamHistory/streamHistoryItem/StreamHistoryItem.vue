<template>
  <list-item>
    <template slot="header">
      <div class="column">
        <p>{{ history.streamName }}</p>
      </div>
      <div class="column">
        <standard-button :buttonClasses="'button--accent'" @click.native="loadSelectedHistory">Watch</standard-button>
      </div>
    </template>
    <p slot="content" class="sub-text">Watched: {{ timeAdded }}</p>
  </list-item>
</template>

<script src="./streamHistoryItem.js"></script>

<style lang="scss">
@import "./streamHistoryItem.scss";
</style>