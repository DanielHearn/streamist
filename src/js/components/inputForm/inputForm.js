export default {
  name: 'input-form',
  props: ['placeholder'],
  data: function () {
    return {
      inputValue: ''
    }
  },
  methods: {
    submit: function (e) {
      this.$emit('submit', e, this.inputValue)
      this.inputValue = ''
    }
  }
}
