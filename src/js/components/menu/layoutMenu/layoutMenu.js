import MenuItem from 'Components/menu/menuItem/MenuItem.vue'
import LayoutDemo from 'Components/layout/layoutDemo/LayoutDemo.vue'
import List from 'Components/list/list/List.vue'

import { config } from 'Js/config'

export default {
  name: 'layout-menu',
  components: {
    MenuItem,
    LayoutDemo,
    List
  },
  props: {
    streams: {
      type: Array,
      required: true
    }
  },
  config: config,
  computed: {
    indexedStreams: function () {
      return this.streams.map((stream, index) => {
        stream.index = index + 1
        return stream
      })
    }
  },
  methods: {
    changeLayout: function (newLayout) {
      if (newLayout.id !== this.$store.state.options.currentLayout.id) {
        const options = this.$store.state.options
        options.currentLayout = newLayout
        this.$store.commit('setOptions', options)
      }
    }
  }
}
