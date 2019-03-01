import MenuItem from 'Components/menuItem/MenuItem.vue'
import StreamHistoryControls from 'Components/streamHistoryControls/StreamHistoryControls.vue'

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
    }
  }
}
