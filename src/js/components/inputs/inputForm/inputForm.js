import StandardButton from 'Components/inputs/buttons/standardButton/StandardButton.vue'

export default {
  name: 'input-form',
  components: {
    StandardButton
  },
  props: {
    placeholder: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      required: false,
      default: 'Add'
    }
  },
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
