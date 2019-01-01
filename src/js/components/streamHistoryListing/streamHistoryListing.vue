Vue.component('stream-history-listing', {
  props: ['stream', 'currentDate'],
  computed: {
    timeAdded: function () {
      // Show time since add
      const relativeDate = dateFns.distanceInWordsStrict(
        this.stream.dateAdded,
        this.currentDate
      )
      return `${relativeDate} ago`
    }
  },
  template: `<div class="history-listing">
                  <p class="text-sub-heading">{{ stream.streamName }}</p>
                  <div class="listing-details">
                    <p class="sub-text">Added: {{ timeAdded }}</p>
                    <button class="button--green" @click="loadSelectedHistory" title="Add Stream">Add</button>
                  </div>
              </div>`,
  methods: {
    loadSelectedHistory: function () {
      this.$emit('load-selected-history', this.stream.streamName)
    }
  }
})

