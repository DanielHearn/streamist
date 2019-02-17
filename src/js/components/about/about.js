import MenuItem from 'Components/menuItem/MenuItem.vue'

export default {
  name: 'about',
  components: {
    MenuItem
  },
  methods: {
    closeOptions: function () {
      this.$emit('close-options')
    }
  }
}
