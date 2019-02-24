import { log } from 'Js/utilities'
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
      displayControls: false,
      componentHover: false,
      componentHoverTracker: 0
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
      try {
        this.displayControls = true
        const playerElement = document.querySelector(`.stream--${this.currentStream.embedPlayerID}`)
        if (playerElement) {
          playerElement.addEventListener('mousemove', this.checkMovement, false)
        }

        const options = {
          channel: this.currentStream.streamName,
          layout: 'video',
          allowfullscreen: false,
          theme: 'dark'
        }
        this.playerEmbed = new Twitch.Embed(this.currentStream.embedPlayerID, options)
        this.player = this.playerEmbed.getPlayer()
      } catch (error) {
        console.error('Twitch API script is not loaded')
      }
    },
    checkMovement: function () {
      this.componentHover = true
      this.componentHoverTracker += 1

      const component = this
      setTimeout(function () {
        component.componentHoverTracker -= 1
        if (component.componentHoverTracker === 0) {
          component.componentHover = false
        }
      }, 4000)
    }
  },
  mounted: function () {
    this.displayStream()
  }
}
