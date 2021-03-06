import StandardButton from './../standardButton/StandardButton.vue'

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
      required: false
    },
    buttonClasses: {
      default: 'button--accent',
      type: String,
      required: false
    },
    iconClasses: {
      default: '',
      type: String,
      required: false
    },
    hasWarningColor: {
      default: false,
      type: Boolean,
      required: false
    }
  },
  computed: {
    warningClass: function () {
      return this.hasWarningColor ? 'button--warning' : ''
    }
  }
}
