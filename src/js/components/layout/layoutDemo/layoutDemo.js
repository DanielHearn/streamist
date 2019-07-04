import ListItem from './../../list/listItem/ListItem.vue'
import StandardButton from './../../inputs/buttons/standardButton/StandardButton.vue'
import IconButton from './../../inputs/buttons/iconButton/IconButton.vue'

import Icons from './../../../icons'

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
      type: Boolean,
      default: false,
      required: false
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
