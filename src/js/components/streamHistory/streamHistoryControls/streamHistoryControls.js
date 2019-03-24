import StreamHistoryItem from 'Components/streamHistory/streamHistoryItem/StreamHistoryItem.vue'
import StandardButton from 'Components/inputs/buttons/standardButton/StandardButton.vue'
import List from 'Components/list/list/List.vue'

export default {
  name: 'stream-history-controls',
  components: {
    StreamHistoryItem,
    StandardButton,
    List
  },
  props: {
    streamHistory: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
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
