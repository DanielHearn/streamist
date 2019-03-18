import IconButton from 'Components/inputs/buttons/iconButton/iconButton.vue'

export default {
  name: 'remove-button',
  components: {
    IconButton
  },
  props: {
    disabled: {
      default: false,
      type: Boolean,
      required: false
    },
    hasWarningColor: {
      default: false,
      type: Boolean,
      required: false
    }
  }
}
