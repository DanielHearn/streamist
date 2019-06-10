import StandardButton from './../../inputs/buttons/standardButton/StandardButton.vue'
import IconButton from './../../inputs/buttons/iconButton/IconButton.vue'

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
