import draggable from 'vuedraggable'
import Stream from 'Components/stream/Stream.vue'
import Intro from 'Components/intro/Intro.vue'
import ArrowButton from 'Components/inputs/buttons/iconButtons/arrowButton/ArrowButton.vue'

export default {
  name: 'streams',
  components: {
    draggable,
    Stream,
    Intro,
    ArrowButton
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
    }
  },
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
  computed: {
    'layoutClass': function () {
      return `streams--layout-${this.options.currentLayout.id}`
    }
  },
  methods: {
    removeStream: function (removedStream) {
      // Remove stream with matching streamIndex from currentStreams
      const newStreams = this.streams.filter(stream => stream !== removedStream)
      this.$emit('update-streams', newStreams)
    },
    toggleNav: function () {
      this.$emit('toggle-nav')
    }
  }
}
