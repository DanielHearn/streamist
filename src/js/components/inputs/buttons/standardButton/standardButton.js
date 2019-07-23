export default {
  name: 'standard-button',
  props: {
    disabled: {
      default: false,
      type: Boolean,
      required: false
    },
    buttonClasses: {
      default: 'button--accent',
      type: String,
      required: false
    }
  }
}
