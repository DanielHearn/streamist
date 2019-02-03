import { distanceInWordsStrict } from 'date-fns'

export default {
  name: 'stream-history-listing',
  props: ['history', 'currentDate'],
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
