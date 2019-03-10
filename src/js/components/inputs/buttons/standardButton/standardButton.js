export default {
  name: 'standard-button',
  props: {
    disabled: {
      default: false,
      type: Boolean
    },
    buttonClasses: {
      default: 'button--accent',
      type: String,
      required: false
    }
  }
}
