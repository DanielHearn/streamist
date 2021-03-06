import IconButton from './../../inputs/buttons/iconButton/IconButton.vue'
import StandardButton from './../../inputs/buttons/standardButton/StandardButton.vue'
import Icons from './../../../icons'

export default {
  name: 'input-form',
  components: {
    StandardButton,
    IconButton
  },
  props: {
    placeholder: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      required: false,
      default: 'Add'
    },
    buttonIconName: {
      type: String,
      required: false,
      default: ''
    },
    warning: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  icons: Icons,
  data: function () {
    return {
      inputValue: ''
    }
  },
  computed: {
    isIcon: function () {
      return this.buttonIconName && this.$options.icons[this.buttonIconName]
    },
    buttonIcon: function () {
      return this.$options.icons[this.buttonIconName]
    }
  },
  methods: {
    submit: function () {
      // e.preventDefault()
      this.$emit('submit', this.inputValue)
      this.inputValue = ''
    }
  }
}
