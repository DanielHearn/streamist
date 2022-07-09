import StreamHistoryItem from './../streamHistoryItem/StreamHistoryItem.vue'
import ItemList from './../../list/list/ItemList.vue'

export default {
  name: 'stream-history-controls',
  components: {
    StreamHistoryItem,
    ItemList
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
