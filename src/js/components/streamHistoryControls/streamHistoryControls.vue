Vue.component('stream-history-controls', {
  props: ['streamHistory'],
  data: function () {
    return {
      selectedHistory: '',
      currentDate: new Date()
    }
  },
  computed: {
    orderedHistory: function () {
      return this.streamHistory.slice().reverse()
    },
    historyAvailable: function () {
      return this.streamHistory.length > 0
    }
  },
  template: `<div class="stream-history" v-if="streamHistory">
              <p class="text" v-if="!historyAvailable">No streams in history</p>
              <ul class="history-list">
                <stream-history-listing 
                    v-for="stream in orderedHistory" 
                    :stream="stream" 
                    :current-date="currentDate"
                    v-on:load-selected-history="loadSelectedHistory"
                    ></stream-history-listing>
              </ul>
              <button class="button--green" @click="clearHistory" :disabled="!historyAvailable">Clear History</butto>
             </div>`,
  methods: {
    loadSelectedHistory: function (streamName) {
      this.$emit('load-selected-history', streamName)
    },
    clearHistory: function () {
      this.$emit('clear-history')
    }
  }
})