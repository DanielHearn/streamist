import MenuItem from 'Components/menu/menuItem/MenuItem.vue'
import StreamHistoryControls from 'Components/streamHistory/streamHistoryControls/StreamHistoryControls.vue'

export default {
  name: 'history-menu',
  components: {
    MenuItem,
    StreamHistoryControls
  },
  props: {
    streamHistory: {
      default: [],
      type: Array,
      required: true
    },
    smallInterface: {
      default: false,
      type: Boolean,
      required: true
    }
  },
  methods: {
    loadSelectedHistory: function (streamName) {
      this.$emit('load-selected-history', streamName)
    }
  }
}
