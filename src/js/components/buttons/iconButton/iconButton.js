import StandardButton from 'Components/buttons/standardButton/StandardButton.vue'

export default {
  name: 'icon-button',
  components: {
    StandardButton
  },
  props: {
    disabled: {
      default: false,
      type: Boolean
    },
    iconName: {
      default: 'mouse',
      type: String
    }
  }
}
