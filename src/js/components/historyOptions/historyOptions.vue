<template>
  <div class="option">
    <div class="option-header">
      <p class="text-heading">Stream History</p>
      <close-button v-on:close="closeOptions" title="Close Settings"></close-button>
    </div>
    <stream-history-controls :stream-history="streamHistory" v-on:load-selected-history="loadSelectedHistory" v-on:clear-history="clearHistory"></stream-history-controls>
  </div>
</template>

<script>
import CloseButton from './../buttons/closeButton/CloseButton.vue'
import StreamHistoryControls from './../streamHistoryControls/StreamHistoryControls.vue'

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
</script>