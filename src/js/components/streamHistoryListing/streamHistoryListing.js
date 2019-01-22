import { distanceInWordsStrict } from 'date-fns'

export default {
  name: 'stream-history-listing',
  props: ['stream', 'currentDate'],
  computed: {
    timeAdded: function () {
      // Show time since add e.g '1 minute ago'
      const relativeDate = distanceInWordsStrict(
        this.stream.dateAdded,
        this.currentDate
      )
      return `${relativeDate} ago`
    }
  },
  methods: {
    loadSelectedHistory: function () {
      this.$emit('load-selected-history', this.stream.streamName)
    }
  }
}
