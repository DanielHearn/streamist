import StreamControls from 'Components/streamControls/StreamControls.vue'

export default {
  name: 'stream',
  components: {
    StreamControls
  },
  props: {
    currentStream: {
      type: Object,
      required: true
    },
    numStreams: {
      type: Number,
      required: true
    },
    options: {
      type: Object,
      required: true
    },
    hover: {
      type: Boolean,
      required: true
    }
  },
  data: function () {
    return {
      playerEmbed: {},
      player: {},
      displayControls: false
    }
  },
  methods: {
    remove: function () {
      this.$emit('remove-stream', this.currentStream)
    },
    refresh: function () {
      const streamPlayer = document.querySelector(`#${this.currentStream.embedPlayerID}`)
      streamPlayer.innerHTML = ''
      this.displayStream()
    },
    displayStream: function () {
      this.displayControls = true
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
    this.displayStream()
  }
}
