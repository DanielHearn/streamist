export default {
  name: 'remove-button',
  props: ['disabled'],
  methods: {
    remove: function () {
      this.$emit('remove')
    }
  }
}
