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
    clearHistory: function () {
      this.$store.commit('setHistory', [])
    }
  },
  mounted: function () {
    setInterval(() => {
      this.currentDate = new Date()
    }, 1000)
  }
}
