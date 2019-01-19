<template>
  <div class="stream-controls">
    <span v-if="numStreams > 1" class="material-icons handle text--white" title="Reorder stream">drag_handle</span>  
    <a class="url" :href="streamUrl" target="_blank" title="Open Twitch stream">{{ stream.streamName }}</a>
    <remove-button v-on:remove="remove" title="Remove stream"></remove-button>
    <refresh-button v-on:refresh="refresh" title="Refresh stream"></refresh-button>
  </div>
</template>

<script>
import RemoveButton from './../buttons/removeButton/RemoveButton.vue'
import RefreshButton from './../buttons/refreshButton/RefreshButton.vue'

export default {
  name: 'stream-controls',
  components: {
    RemoveButton,
    RefreshButton
  },
  props: ['stream', 'numStreams'],
  computed: {
    streamUrl: function () {
      return `https://www.twitch.tv/${this.stream.streamName}`
    }
  },
  methods: {
    remove: function () {
      this.$emit('remove')
    },
    refresh: function () {
      this.$emit('refresh')
    }
  },
}
</script>