import draggable from 'vuedraggable'
import StreamItem from 'Components/stream/streamItem/StreamItem.vue'
import IconButton from 'Components/inputs/buttons/iconButton/IconButton.vue'

import Icons from 'Js/icons'

export default {
  name: 'stream-list',
  components: {
    draggable,
    StreamItem,
    IconButton
  },
  props: {
    streams: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      required: true
    },
    navVisible: {
      type: Boolean,
      required: true
    },
    appHover: {
      type: Boolean,
      required: true
    },
    streamFavorites: {
      type: Array,
      required: true
    }
  },
  icons: Icons,
  data: function () {
    return {
      orderedStreams: this.streams.slice(),
      drag: false
    }
  },
  watch: {
    orderedStreams: function () {
      this.$emit('update-streams', this.orderedStreams)
    },
    streams: function () {
      if (this.orderedStreams !== this.streams) {
        this.orderedStreams = this.streams
      }
    }
  },
  computed: {
    layoutClass: function () {
      return `streams--layout-${this.options.currentLayout.id}`
    },
    streamLengthClass: function () {
      return `streams--${this.streams.length}`
    }
  },
  methods: {
    removeStream: function (removedStream) {
      // Remove stream with matching streamIndex from streams
      const newStreams = this.streams.filter(stream => stream !== removedStream)
      this.$emit('update-streams', newStreams)
    },
    toggleNav: function () {
      this.$emit('toggle-nav')
    },
    favoriteChannel: function (streamName) {
      this.$emit('favorite-channel', streamName)
    },
    unfavoriteChannel: function (streamName) {
      this.$emit('unfavorite-channel', streamName)
    }
  }
}
