import RemoveButton from 'Components/buttons/removeButton/RemoveButton.vue'
import RefreshButton from 'Components/buttons/refreshButton/RefreshButton.vue'

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
  }
}
