import IconButton from 'Components/inputs/buttons/iconButton/iconButton.vue'

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
    direction: function () {
      this.setIconName()
    }
  },
  methods: {
    setIconName: function () {
      this.iconName = this.mapDirection(this.direction)
    },
    mapDirection: function () {
      switch (this.direction) {
        case 'left':
          return 'arrow_back'
        case 'right':
          return 'arrow_forward'
        case 'up':
          return 'arrow_upward'
        case 'down':
          return 'arrow_downward'
      }
    }
  },
  mounted: function () {
    this.setIconName()
  }
}
