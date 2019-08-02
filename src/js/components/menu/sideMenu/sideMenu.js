import IconButton from './../../inputs/buttons/iconButton/IconButton.vue'

export default {
  name: 'side-menu',
  components: {
    IconButton
  },
  props: {
    menuItems: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      currentMenu: ''
    }
  },
  watch: {
    currentMenu: function () {
      this.$emit('current-menu', this.currentMenu)
    }
  },
  methods: {
    closeMenu: function () {
      this.currentMenu = ''
    },
    loadMenu: function (menu) {
      this.currentMenu = menu === this.currentMenu ? '' : menu
    }
  }
}
