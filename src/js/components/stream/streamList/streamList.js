import draggable from 'vuedraggable'
import StreamItem from './../streamItem/StreamItem.vue'

export default {
  name: 'stream-list',
  components: {
    draggable,
    StreamItem
  },
  props: {
    streams: {
      type: Array,
      required: true
    },
    favorites: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      orderedStreams: this.streams.slice(),
      drag: false
    }
  },
  watch: {
    orderedStreams: function () {
      this.$store.commit('setStreams', this.orderedStreams)
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
  }
}
