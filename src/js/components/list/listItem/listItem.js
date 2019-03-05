import StandardButton from 'Components/inputs/buttons/standardButton/StandardButton.vue'

export default {
  name: 'list-item',
  components: {
    StandardButton
  },
  props: {
    itemName: {
      type: String,
      required: true
    },
    actionName: {
      type: String,
      required: false
    }
  }
}
