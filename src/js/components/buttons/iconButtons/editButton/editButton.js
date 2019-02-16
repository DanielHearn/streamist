import IconButton from 'Components/buttons/iconButton/iconButton.vue'

export default {
  name: 'remove-button',
  components: {
    IconButton
  },
  props: {
    disabled: {
      default: false,
      type: Boolean
    }
  },
  data: function () {
    return {
      active: false,
      iconName: 'edit'
    }
  },
  methods: {
    edit: function () {
      this.active = !this.active
      if (this.active) {
        this.iconName = 'close'
      } else {
        this.iconName = 'edit'
      }
    }
  }
}
