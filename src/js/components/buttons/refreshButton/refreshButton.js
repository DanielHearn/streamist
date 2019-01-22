export default {
  name: 'refresh-button',
  props: ['disabled'],
  methods: {
    refresh: function () {
      this.$emit('refresh')
    }
  }
}
