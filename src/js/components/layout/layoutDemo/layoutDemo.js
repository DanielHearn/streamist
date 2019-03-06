import ListItem from 'Components/list/listItem/ListItem.vue'

export default {
  name: 'layout-demo',
  components: {
    ListItem
  },
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
