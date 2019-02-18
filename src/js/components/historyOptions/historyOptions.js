import MenuItem from 'Components/menuItem/MenuItem.vue'
import StreamHistoryControls from 'Components/streamHistoryControls/StreamHistoryControls.vue'

export default {
  name: 'history-options',
  components: {
    MenuItem,
    StreamHistoryControls
  },
  props: {
    streamHistory: {
      default: [],
      type: Array,
      required: true
    }
  },
  methods: {
    loadSelectedHistory: function (streamName) {
      this.$emit('load-selected-history', streamName)
    },
    clearHistory: function () {
      this.$emit('clear-history')
    },
    closeOptions: function () {
      this.$emit('close-options')
    }
  }
}
