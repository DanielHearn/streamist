import MenuItem from './../../menu/menuItem/MenuItem.vue'
import LayoutDemo from './../../layout/layoutDemo/LayoutDemo.vue'
import List from './../../list/list/List.vue'

import { config } from './../../../config'

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
    },
    currentLayout: {
      type: Object,
      required: true
    }
  },
  config: config,
  methods: {
    changeLayout: function (newLayout) {
      if (newLayout.id !== this.currentLayout.id) {
        const options = this.$store.state.options
        options.currentLayout = newLayout
        this.$store.commit('setOptions', options)
      }
    }
  }
}
