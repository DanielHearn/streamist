import MenuItem from 'Components/menuItem/MenuItem.vue'

export default {
  name: 'help-options',
  components: {
    MenuItem
  },
  methods: {
    closeOptions: function () {
      this.$emit('close-options')
    }
  }
}
