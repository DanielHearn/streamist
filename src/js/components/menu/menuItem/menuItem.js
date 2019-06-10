import IconButton from './../../inputs/buttons/iconButton/IconButton.vue'
import Icons from './../../../icons'

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
