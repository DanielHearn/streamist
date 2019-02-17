import StandardButton from 'Components/buttons/standardButton/StandardButton.vue'

export default {
  name: 'input-form',
  components: {
    StandardButton
  },
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
