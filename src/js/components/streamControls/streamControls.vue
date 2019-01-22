<template>
  <div class="stream-controls">
    <span v-if="numStreams > 1" class="material-icons handle text--white" title="Reorder stream">drag_handle</span>  
    <a class="url" :href="streamUrl" target="_blank" title="Open Twitch stream">{{ stream.streamName }}</a>
    <remove-button v-on:remove="remove" title="Remove stream"></remove-button>
    <refresh-button v-on:refresh="refresh" title="Refresh stream"></refresh-button>
  </div>
</template>

<script src="./streamControls.js"></script>

<style lang="scss">
@import "../../../scss/partials/mixins.scss";

.stream-controls {
  @include border-radius;
  position: absolute;
  display: none;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: $green-light;
  padding: $content-padding/2;
  cursor: default;
  right: 1em;
  top: 1em;
  opacity: 0;
  z-index: 10;
  &.active {
    display: flex;
    opacity: 1;
  }
  p, button {
    margin: 0 0.25em;
  }
}
</style>