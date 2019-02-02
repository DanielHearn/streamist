export default {
  name: 'layout-demo',
  props: ['currentStreams', 'layout'],
  computed: {
    layoutClass: function () {
      return `layout-demo--layout-${this.layout.id}`
    }
  }
}
