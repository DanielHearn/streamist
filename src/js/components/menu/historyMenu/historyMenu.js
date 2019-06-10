import MenuItem from './../../menu/menuItem/MenuItem.vue'
import StreamHistoryControls from './../../streamHistory/streamHistoryControls/StreamHistoryControls.vue'

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
