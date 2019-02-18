import IconButton from 'Components/buttons/iconButton/iconButton.vue'

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
    }
  }
}
