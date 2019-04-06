import IconButton from 'Components/inputs/buttons/iconButton/IconButton.vue'

export default {
  name: 'side-menu',
  components: {
    IconButton
  },
  props: {
    menuItems: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      currentMenu: ''
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