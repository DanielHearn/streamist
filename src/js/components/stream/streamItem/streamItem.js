import ControlBar from 'Components/controlBar/ControlBar.vue'
import IconButton from 'Components/inputs/buttons/iconButton/IconButton.vue'
import Icons from 'Js/icons/'

export default {
  name: 'stream-item',
  components: {
    ControlBar,
    IconButton
  },
  props: {
    stream: {
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
    },
    streamFavorites: {
      type: Array,
      required: true
    },
    isFirstStream: {
      type: Boolean,
      required: true
    }
  },
  icons: Icons,
  data: function () {
    return {
      playerEmbed: {},
      player: {},
      displayControls: false,
      componentHover: false,
      componentHoverTracker: 0
    }
  },
  computed: {
    streamUrl: function () {
      return `https://www.twitch.tv/${this.stream.streamName}`
    },
    favorited: function () {
      return !!this.streamFavorites.filter(favorite => {
        return (
          favorite.streamName.toLowerCase() ===
          this.stream.streamName.toLowerCase()
        )
      }).length
    }
  },
  methods: {
    remove: function () {
      this.$emit('remove-stream', this.stream)
    },
    refresh: function () {
      const streamPlayer = document.querySelector(
        `#${this.stream.embedPlayerID}`
      )
      streamPlayer.innerHTML = ''
      this.displayStream()
    },
    displayStream: function () {
      try {
        this.displayControls = true
        const playerElement = document.querySelector(
          `.stream--${this.stream.embedPlayerID}`
        )
        if (playerElement) {
          playerElement.addEventListener('mousemove', this.checkMovement, false)
        }

        const options = {
          channel: this.stream.streamName,
          layout: 'video',
          autoplay: false
        }
        const playerEmbed = new Twitch.Embed(this.stream.embedPlayerID, options)
        playerEmbed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
          const player = playerEmbed.getPlayer()
          player.play()
          if (!this.isFirstStream) {
            player.setMuted(true)
          } else {
            player.setMuted(false)
          }
        })
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
      }, 3000)
    },
    favoriteChannel: function () {
      if (this.favorited) {
        this.$emit(
          'unfavorite-channel',
          this.currentStream.streamName.toLowerCase()
        )
      } else {
        this.$emit(
          'favorite-channel',
          this.currentStream.streamName.toLowerCase()
        )
      }
    }
  },
  mounted: function () {
    this.displayStream()
  }
}
