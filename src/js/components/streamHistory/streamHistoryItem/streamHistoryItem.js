import { distanceInWordsStrict } from 'date-fns'
import StandardButton from './../../inputs/buttons/standardButton/StandardButton.vue'
import IconButton from './../../inputs/buttons/iconButton/IconButton.vue'
import ListItem from './../../list/listItem/ListItem.vue'

import Icons from './../../../icons'
import { generateID, createStreamObject } from './../../../utilities'

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
      const streamObj = createStreamObject(
        this.history.streamName,
        generateID()
      )
      this.$store.commit('addStream', streamObj)
      this.$store.commit('addStreamToHistory', streamObj)
    }
  }
}
