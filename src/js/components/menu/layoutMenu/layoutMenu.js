import MenuItem from './../../menu/menuItem/MenuItem.vue'
import LayoutDemo from './../../layout/layoutDemo/LayoutDemo.vue'
import List from './../../list/list/List.vue'
import ListItem from './../../list/ListItem/ListItem.vue'
import StandardButton from './../../inputs/buttons/standardButton/StandardButton.vue'
import Icons from './../../../icons'

import { config } from './../../../config'

export default {
  name: 'layout-menu',
  components: {
    MenuItem,
    LayoutDemo,
    List,
    ListItem,
    StandardButton
  },
  icons: Icons,
  props: {
    streams: {
      type: Array,
      required: true
    },
    currentLayout: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    },
    smallInterface: {
      type: Boolean,
      required: true
    }
  },
  config: config,
  data: function () {
    return {
      chatLocation: this.options.chatLocation
    }
  },
  watch: {
    chatLocation: function () {
      if (this.options.chatLocation !== this.chatLocation) {
        console.log(this.chatLocation)
        this.options.chatLocation = this.chatLocation
        this.$store.commit('setOptions', this.options)
      }
    },
    'options.chatLocation': function () {
      this.chatLocation = this.options.chatLocation
    }
  },
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
