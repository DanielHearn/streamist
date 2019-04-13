import { distanceInWordsStrict } from 'date-fns'
import StandardButton from 'Components/inputs/buttons/standardButton/StandardButton.vue'
import IconButton from 'Components/inputs/buttons/iconButton/IconButton.vue'
import ListItem from 'Components/list/listItem/ListItem.vue'

import Icons from 'Js/icons/'

export default {
  name: 'stream-history-item',
  components: {
    StandardButton,
    ListItem,
    IconButton
  },
  props: {
    history: {
      type: Object,
      required: true
    },
    currentDate: {
      type: Date,
      required: true
    },
    smallInterface: {
      default: false,
      type: Boolean,
      required: true
    }
  },
  icons: Icons,
  computed: {
    timeAdded: function () {
      // Show time since add e.g '1 minute ago'
      const relativeDate = distanceInWordsStrict(
        this.history.dateAdded,
        this.currentDate
      )
      return `${relativeDate} ago`
    }
  },
  methods: {
    loadSelectedHistory: function () {
      this.$emit('load-selected-history', this.history.streamName)
    }
  }
}
