import IconButton from 'Components/inputs/buttons/iconButton/iconButton.vue'

export default {
  name: 'edit-button',
  components: {
    IconButton
  },
  props: {
    disabled: {
      default: false,
      type: Boolean,
      required: false
    },
    editActive: {
      default: false,
      type: Boolean,
      required: false
    }
  }
}
