import IconButton from 'Components/inputs/buttons/iconButton/iconButton.vue'

export default {
  name: 'refresh-button',
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
