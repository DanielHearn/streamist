import RemoveButton from 'Components/inputs/buttons/iconButtons/removeButton/RemoveButton.vue'
import RefreshButton from 'Components/inputs/buttons/iconButtons/refreshButton/RefreshButton.vue'

export default {
  name: 'stream-controls',
  components: {
    RemoveButton,
    RefreshButton
  },
  props: {
    stream: {
      type: Object,
      required: true
    },
    numStreams: {
      type: Number,
      required: true
    }
  },
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
