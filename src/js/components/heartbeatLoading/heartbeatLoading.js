export default {
  name: 'heartbeat-loading',
  props: {
    active: {
      type: Boolean,
      default: true,
      required: false
    },
    color: {
      type: String,
      default: 'white',
      required: false
    }
  },
  data: function () {
    return {
      styles: {
        backgroundColor: this.color
      }
    }
  }
}
