import CloseButton from './../buttons/closeButton/CloseButton.vue'
import LayoutDemo from './../layoutDemo/LayoutDemo.vue'

export default {
  name: 'layout-options',
  components: {
    CloseButton,
    LayoutDemo
  },
  props: ['currentStreams', 'availableLayouts', 'options'],
  data: function () {
    return {
      selectedLayout: this.options.currentLayout
    }
  },
  computed: {
    streams: function () {
      return this.currentStreams.map((stream, index) => {
        stream.index = index + 1
        return stream
      })
    }
  },
  watch: {
    'selectedLayout': function () {

    }
  },
  methods: {
    closeOptions: function () {
      this.$emit('close-options')
    },
    changeLayout: function (newLayout) {
      if (newLayout !== this.selectedLayout) {
        this.selectedLayout = newLayout
        this.$emit('change-layout', newLayout)
      }
    }
  }
}
