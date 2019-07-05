import StreamHistoryItem from './../streamHistoryItem/StreamHistoryItem.vue'
import List from './../../list/list/List.vue'

export default {
  name: 'stream-history-controls',
  components: {
    StreamHistoryItem,
    List
  },
  props: {
    streamHistory: {
      type: Array,
      required: true
    },
    smallInterface: {
      type: Boolean,
      required: false,
      default: false
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
  mounted: function () {
    setInterval(() => {
      this.currentDate = new Date()
    }, 1000)
  }
}
