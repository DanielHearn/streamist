import StandardButton from 'Components/inputs/buttons/standardButton/StandardButton.vue'
import IconButton from 'Components/inputs/buttons/iconButton/IconButton.vue'

export default {
  name: 'list-item',
  components: {
    StandardButton,
    IconButton
  },
  props: {
    itemName: {
      type: String,
      required: true
    },
    actionNameIsIcon: {
      type: Boolean,
      default: false,
      required: false
    },
    actionName: {
      type: String,
      required: false
    },
    actionTitle: {
      type: String,
      default: '',
      required: false
    },
    handleActive: {
      type: Boolean,
      default: false,
      required: false
    },
    canEditTitle: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data: function () {
    return {
      title: this.itemName
    }
  },
  watch: {
    title: function () {
      this.$emit('test', this.title)
    }
  }
}
