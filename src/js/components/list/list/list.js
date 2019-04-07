export default {
  name: 'list',
  props: {
    layout: {
      default: 'column',
      type: String,
      required: false
    }
  },
  computed: {
    layoutClass: function () {
      return `list--layout-${this.layout}`
    }
  }
}
