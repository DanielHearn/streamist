import ControlBar from 'Components/controlBar/ControlBar.vue'
import IconButton from 'Components/inputs/buttons/iconButton/IconButton.vue'
import Icons from './../../../icons'

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
    hover: {
      type: Boolean,
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
      return !!this.$store.state.streamFavorites.filter(favorite => {
        return (
          favorite.streamName.toLowerCase() ===
          this.stream.streamName.toLowerCase()
        )
      }).length
    }
  },
  methods: {
    remove: function () {
      this.$store.commit('removeStream', this.stream)
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

      setTimeout(() => {
        this.componentHoverTracker -= 1
        if (this.componentHoverTracker === 0) {
          this.componentHover = false
        }
      }, 3000)
    },
    favoriteChannel: function () {
      if (this.favorited) {
        this.$store.commit('removeStreamFromFavorites', this.stream)
      } else {
        this.$store.commit('addStreamToFavorites', this.stream)
      }
    }
  },
  mounted: function () {
    this.displayStream()
  }
}
