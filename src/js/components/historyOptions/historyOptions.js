import CloseButton from 'Components/buttons/closeButton/CloseButton.vue'
import StreamHistoryControls from 'Components/streamHistoryControls/StreamHistoryControls.vue'

export default {
  name: 'history-options',
  components: {
    CloseButton,
    StreamHistoryControls
  },
  props: ['streamHistory'],
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
