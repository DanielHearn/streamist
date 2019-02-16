import CloseButton from 'Components/buttons/iconButtons/closeButton/CloseButton.vue'

export default {
  name: 'menu-item',
  components: {
    CloseButton
  },
  props: ['title', 'closeTitle'],
  methods: {
    closeMenuItem: function () {
      console.log('Click')
      this.$emit('close-menu-item')
    }
  }
}
