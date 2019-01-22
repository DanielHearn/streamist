import draggable from 'vuedraggable'
import Stream from './../stream/Stream.vue'

export default {
  name: 'streams',
  components: {
    draggable,
    Stream
  },
  props: ['streams', 'options'],
  data: function () {
    return {
      orderedStreams: this.streams.slice(),
      drag: false
    }
  },
  watch: {
    'orderedStreams': function () {
      this.$emit('update-streams', this.orderedStreams)
    },
    'streams': function () {
      if (this.orderedStreams !== this.streams) {
        this.orderedStreams = this.streams
      }
    }
  },
  methods: {
    removeStream: function (removedStream) {
      // Remove stream with matching streamIndex from currentStreams
      const newStreams = this.streams.filter(stream => stream !== removedStream)
      this.$emit('update-streams', newStreams)
    }
  }
}
