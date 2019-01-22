export default {
  name: 'close-button',
  props: ['disabled'],
  methods: {
    close: function () {
      this.$emit('close')
    }
  }
}
