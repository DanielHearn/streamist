import CloseButton from 'Components/inputs/buttons/iconButtons/closeButton/CloseButton.vue'

export default {
  name: 'menu-item',
  components: {
    CloseButton
  },
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
