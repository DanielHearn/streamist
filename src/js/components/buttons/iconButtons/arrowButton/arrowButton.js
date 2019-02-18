import IconButton from 'Components/buttons/iconButton/iconButton.vue'

export default {
  name: 'arrow-button',
  components: {
    IconButton
  },
  props: {
    disabled: {
      default: false,
      type: Boolean,
      required: false
    },
    direction: {
      default: 'left',
      type: String,
      required: true
    }
  },
  data: function () {
    return {
      iconName: 'arrow_back'
    }
  },
  watch: {
    'direction': function () {
      this.setIconName()
    }
  },
  methods: {
    setIconName: function () {
      if (this.direction === 'right') {
        this.iconName = 'arrow_forward'
      } else {
        this.iconName = 'arrow_back'
      }
    }
  },
  mounted: function () {
    this.setIconName()
  }
}
