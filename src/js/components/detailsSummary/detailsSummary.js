export default {
  name: 'details-summary',
  props: {
    headerClasses: {
      type: String,
      required: true
    }
  },
  data: function () {
    return {
      active: false
    }
  },
  methods: {
    toggleActive: function () {
      this.active = !this.active
    }
  }
}
