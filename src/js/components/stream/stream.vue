<template>
  <div class="stream" :class="[{active: hover}, 'stream--' + currentStream.embedPlayerID]">
    <div v-if="displayControls">
      <stream-controls
        :stream="currentStream"
        :numStreams="numStreams"
        v-on:remove="remove"
        v-on:refresh="refresh"
        :class="{active: componentHover || hover}"
      />
    </div>
    <div class="stream-main">
      <div class="stream-overlay" :class="{active: hover}"></div>
      <div class="stream-player" draggable="false" :id="currentStream.embedPlayerID"></div>
    </div>
  </div>
</template>

<script src="./stream.js"></script>

<style lang="scss">
    @import './stream.scss';
</style>