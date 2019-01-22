export default {
  name: 'load-button',
  props: ['disabled'],
  methods: {
    load: function () {
      this.$emit('load')
    }
  }
}
