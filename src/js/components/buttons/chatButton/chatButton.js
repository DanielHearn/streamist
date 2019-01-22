export default {
  name: 'chat-button',
  props: ['disabled'],
  methods: {
    toggle: function () {
      this.$emit('toggle')
    }
  }
}
