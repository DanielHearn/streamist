Vue.component('stream', {
  props: ['stream', 'numStreams', 'options', 'hover'],
  data: function () {
    return {
      playerEmbed: {},
      player: {}
    }
  },
  template: `<div class="stream" :class="{active: hover}">
              <stream-controls 
                :stream="stream"
                :numStreams="numStreams"
                v-on:remove="remove"
                v-on:refresh="refresh"
                :class="{active: hover}"
                ></stream-controls>
              <div class="stream-main">
                <div class="stream-overlay" :class="{active: hover}"></div>
                <div class="stream-player" draggable="false" :id="stream.embedPlayerID"></div>
              </div>
            </div>`,
  methods: {
    remove: function () {
      this.$emit('remove-stream', this.stream)
    },
    refresh: function () {
      const streamPlayer = document.querySelector(`#${this.stream.embedPlayerID}`)
      streamPlayer.innerHTML = ''
      this.displayStream()
    },
    displayStream: function () {
      console.log('Display stream: ' + this.stream.streamName)
      const options = {
        channel: this.stream.streamName,
        layout: 'video',
        allowfullscreen: false,
        theme: 'dark'
      }
      this.playerEmbed = new Twitch.Embed(this.stream.embedPlayerID, options)
      this.player = this.playerEmbed.getPlayer()
    }
  },
  created: function () {
    this.currentStream = this.stream
  },
  mounted: function () {
    this.displayStream()
  }
})