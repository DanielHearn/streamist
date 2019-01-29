import CloseButton from './../buttons/closeButton/CloseButton.vue'

export default {
  name: 'layout-options',
  components: {
    CloseButton
  },
  props: ['availableLayouts'],
  data: function () {
    return {
      selectedLayout: 'grid',
      lastLayout: 'grid'
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
