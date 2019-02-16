import CloseButton from 'Components/buttons/iconButtons/closeButton/CloseButton.vue'

export default {
  name: 'about',
  components: {
    CloseButton
  },
  methods: {
    closeOptions: function () {
      this.$emit('close-options')
    }
  }
}
