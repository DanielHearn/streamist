import CloseButton from 'Components/buttons/iconButtons/closeButton/CloseButton.vue'

export default {
  name: 'help-options',
  components: {
    CloseButton
  },
  methods: {
    closeOptions: function () {
      this.$emit('close-options')
    }
  }
}
