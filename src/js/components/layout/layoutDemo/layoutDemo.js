import ListItem from 'Components/list/listItem/ListItem.vue'
import StandardButton from 'Components/inputs/buttons/standardButton/StandardButton.vue'

export default {
  name: 'layout-demo',
  components: {
    ListItem,
    StandardButton
  },
  props: {
    streams: {
      type: Array,
      required: true
    },
    layout: {
      type: Object,
      required: true
    }
  },
  computed: {
    layoutClass: function () {
      return `layout-demo--layout-${this.layout.id}`
    },
    streamLengthClass: function () {
      return `streams--${this.streams.length}`
    }
  }
}
