import MenuItem from 'Components/menu/menuItem/MenuItem.vue'
import LayoutDemo from 'Components/layout/layoutDemo/LayoutDemo.vue'
import List from 'Components/list/list/List.vue'

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
    availableLayouts: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      selectedLayout: this.options.currentLayout
    }
  },
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
      if (newLayout !== this.selectedLayout) {
        this.selectedLayout = newLayout
        this.$emit('change-layout', newLayout)
      }
    }
  }
}
