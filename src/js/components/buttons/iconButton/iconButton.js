import StandardButton from 'Components/buttons/standardButton/StandardButton.vue'

export default {
  name: 'icon-button',
  components: {
    StandardButton
  },
  props: {
    disabled: {
      default: false,
      type: Boolean,
      required: false
    },
    iconName: {
      default: 'mouse',
      type: String,
      required: true
    },
    buttonClasses: {
      default: 'button--green',
      type: String,
      required: false
    },
    iconClasses: {
      default: '',
      type: String,
      required: false
    }
  }
}
