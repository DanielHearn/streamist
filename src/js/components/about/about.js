import CloseButton from 'Components/buttons/closeButton/CloseButton.vue'

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
