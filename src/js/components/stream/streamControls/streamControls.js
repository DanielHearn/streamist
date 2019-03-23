import IconButton from 'Components/inputs/buttons/iconButton/IconButton.vue'

import Icons from 'Js/icons'

export default {
  name: 'stream-controls',
  components: {
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
    }
  },
  icons: Icons,
  computed: {
    streamUrl: function () {
      return `https://www.twitch.tv/${this.stream.streamName}`
    }
  },
  methods: {
    remove: function () {
      this.$emit('remove')
    },
    refresh: function () {
      this.$emit('refresh')
    }
  }
}
