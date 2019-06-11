import MenuItem from './../../menu/menuItem/MenuItem.vue'
import StandardButton from './../../inputs/buttons/standardButton/StandardButton.vue'
import StreamHistoryControls from './../../streamHistory/streamHistoryControls/StreamHistoryControls.vue'

export default {
  name: 'history-menu',
  components: {
    MenuItem,
    StreamHistoryControls,
    StandardButton
  },
  props: {
    streamHistory: {
      default: [],
      type: Array,
      required: true
    }
  },
  computed: {
    historyAvailable: function () {
      return this.streamHistory.length > 0
    }
  },
  methods: {
    clearHistory: function () {
      this.$store.commit('setHistory', [])
    }
  }
}
