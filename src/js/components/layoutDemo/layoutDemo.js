export default {
  name: 'layout-demo',
  props: {
    currentStreams: {
      type: Array,
      required: true
    },
    layout: {
      type: Object,
      required: true
    }
  },
  computed: {
    layoutClass: function () {
      return `layout-demo--layout-${this.layout.id}`
    }
  }
}
