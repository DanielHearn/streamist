import IconButton from 'Components/inputs/buttons/iconButton/IconButton.vue'
import Icons from 'Js/icons'

export default {
  name: 'menu-item',
  components: {
    IconButton
  },
  icons: Icons,
  props: {
    title: {
      type: String,
      required: true
    },
    closeTitle: {
      type: String,
      required: true
    }
  }
}
