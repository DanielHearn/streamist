import StandardButton from 'Components/inputs/buttons/standardButton/StandardButton.vue'
import IconButton from 'Components/inputs/buttons/iconButton/IconButton.vue'

export default {
  name: 'list-item',
  components: {
    StandardButton,
    IconButton
  },
  props: {
    handleActive: {
      type: Boolean,
      default: false,
      required: false
    }
  }
}
