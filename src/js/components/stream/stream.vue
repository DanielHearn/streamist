<template>
  <div class="stream" :class="{active: hover}">
    <stream-controls 
      :stream="currentStream"
      :numStreams="numStreams"
      v-on:remove="remove"
      v-on:refresh="refresh"
      :class="{active: hover}"
      ></stream-controls>
    <div class="stream-main">
      <div class="stream-overlay" :class="{active: hover}"></div>
      <div class="stream-player" draggable="false" :id="currentStream.embedPlayerID"></div>
    </div>
  </div>
</template>

<script>
import StreamControls from './../streamControls/StreamControls.vue'

export default {
  name: 'stream',
  components: {
    StreamControls
  },
  props: ['currentStream', 'numStreams', 'options', 'hover'],
  data: function () {
    return {
      playerEmbed: {},
      player: {}
    }
  },
  template: ``,
  methods: {
    remove: function () {
      this.$emit('remove-stream', this.stream)
    },
    refresh: function () {
      const streamPlayer = document.querySelector(`#${this.currentStream.embedPlayerID}`)
      streamPlayer.innerHTML = ''
      this.displayStream()
    },
    displayStream: function () {
      console.log('Display stream: ' + this.currentStream.streamName)
      const options = {
        channel: this.currentStream.streamName,
        layout: 'video',
        allowfullscreen: false,
        theme: 'dark'
      }
      this.playerEmbed = new Twitch.Embed(this.currentStream.embedPlayerID, options)
      this.player = this.playerEmbed.getPlayer()
    }
  },
  mounted: function () {
    console.log('Mounted Stream: ', this.currentStream)
    this.displayStream()
  }
}
</script>