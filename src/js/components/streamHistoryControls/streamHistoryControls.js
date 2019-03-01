import StreamHistoryListing from 'Components/streamHistoryListing/StreamHistoryListing.vue'
import StandardButton from 'Components/buttons/standardButton/StandardButton.vue'

export default {
  name: 'stream-history-controls',
  components: {
    StreamHistoryListing,
    StandardButton
  },
  props: {
    streamHistory: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      selectedHistory: '',
      currentDate: new Date()
    }
  },
  computed: {
    orderedHistory: function () {
      this.currentDate = new Date()
      return this.streamHistory.slice().reverse()
    },
    historyAvailable: function () {
      return this.streamHistory.length > 0
    }
  },
  template: ``,
  methods: {
    loadSelectedHistory: function (streamName) {
      this.$emit('load-selected-history', streamName)
    }
  },
  mounted: function () {
    const self = this
    setInterval(() => {
      self.currentDate = new Date()
    }, 1000)
  }
}
