<template>
  <div class="stream" :class="{active: hover}">
    <div v-if="displayControls">
      <stream-controls
        :stream="currentStream"
        :numStreams="numStreams"
        v-on:remove="remove"
        v-on:refresh="refresh"
        :class="{active: hover}"
      />
    </div>
    <div class="stream-main">
      <div class="stream-overlay" :class="{active: hover}"></div>
      <div class="stream-player" draggable="false" :id="currentStream.embedPlayerID"></div>
    </div>
  </div>
</template>


<script src="./stream.js"></script>