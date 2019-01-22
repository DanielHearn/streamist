export default {
  name: 'edit-button',
  props: ['disabled'],
  data: function () {
    return {
      active: false
    }
  },
  methods: {
    edit: function () {
      this.active = !this.active
      this.$emit('edit')
    }
  }
}
