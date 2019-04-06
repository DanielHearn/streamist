export default {
  name: 'list',
  props: {
    layout: {
      default: 'column',
      type: String,
      required: true
    }
  },
  computed: {
    layoutClass: function () {
      return `list--layout-${this.layout}`
    }
  }
}
