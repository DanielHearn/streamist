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
    appHover: {
      type: Boolean,
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
      return `streams--layout-${this.$store.state.options.currentLayout.id}`
    },
    streamLengthClass: function () {
      return `streams--${this.$store.state.streams.length}`
    }
  }
}
