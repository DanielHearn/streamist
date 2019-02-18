import { distanceInWordsStrict } from 'date-fns'
import StandardButton from 'Components/buttons/standardButton/StandardButton.vue'

export default {
  name: 'stream-history-listing',
  components: {
    StandardButton
  },
  props: {
    history: {
      type: Object,
      required: true
    },
    currentDate: {
      type: Date,
      required: true
    }
  },
  computed: {
    timeAdded: function () {
      // Show time since add e.g '1 minute ago'
      const relativeDate = distanceInWordsStrict(
        this.history.dateAdded,
        this.currentDate
      )
      return `${relativeDate} ago`
    }
  },
  methods: {
    loadSelectedHistory: function () {
      this.$emit('load-selected-history', this.history.streamName)
    }
  }
}
