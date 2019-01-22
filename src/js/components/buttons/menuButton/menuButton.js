export default {
  name: 'menu-button',
  props: ['disabled'],
  methods: {
    toggle: function () {
      this.$emit('toggle')
    }
  }
}
