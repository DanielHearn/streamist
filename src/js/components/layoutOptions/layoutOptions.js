import CloseButton from './../buttons/closeButton/CloseButton.vue'

export default {
  name: 'layout-options',
  components: {
    CloseButton
  },
  props: ['currentStreams', 'availableLayouts', 'options'],
  data: function () {
    return {
      selectedLayout: this.options.currentLayout,
      lastLayout: this.options.currentLayout
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
      if (this.selectedLayout !== this.lastLayout) {
        this.lastLayout = this.selectedLayout
        console.log(this.selectedLayout)
        this.$emit('change-layout', this.selectedLayout)
      }
    }
  },
  methods: {
    closeOptions: function () {
      this.$emit('close-options')
    }
  }
}
