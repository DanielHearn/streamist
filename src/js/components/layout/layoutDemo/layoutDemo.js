import ListItem from 'Components/list/listItem/ListItem.vue'
import StandardButton from 'Components/inputs/buttons/standardButton/StandardButton.vue'
import IconButton from 'Components/inputs/buttons/iconButton/IconButton.vue'

import Icons from 'Js/icons'

export default {
  name: 'layout-demo',
  components: {
    ListItem,
    StandardButton,
    IconButton
  },
  icons: Icons,
  props: {
    streams: {
      type: Array,
      required: true
    },
    layout: {
      type: Object,
      required: true
    },
    smallInterface: {
      default: false,
      type: Boolean,
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
