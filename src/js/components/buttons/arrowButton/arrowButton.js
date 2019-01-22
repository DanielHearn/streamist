export default {
  name: 'menu-button',
  props: ['disabled', 'buttonTitle', 'direction'],
  methods: {
    toggle: function () {
      this.$emit('toggle')
    }
  }
}
