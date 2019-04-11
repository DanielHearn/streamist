import StandardButton from 'Components/inputs/buttons/standardButton/StandardButton.vue'
import IconButton from 'Components/inputs/buttons/iconButton/IconButton.vue'
import List from 'Components/list/list/List.vue'
import ListItem from 'Components/list/listItem/ListItem.vue'
import InputForm from 'Components/inputs/inputForm/InputForm.vue'

import Icons from 'Js/icons'

export default {
  name: 'stream-favorites-controls',
  components: {
    StandardButton,
    List,
    ListItem,
    IconButton,
    InputForm
  },
  props: {
    streamFavorites: {
      type: Array,
      required: true
    },
    smallScreen: {
      default: false,
      type: Boolean,
      required: true
    }
  },
  icons: Icons,
  computed: {
    favoritesAvailable: function () {
      return this.streamFavorites.length > 0
    }
  },
  methods: {
    loadSelectedFavorite: function (streamName) {
      this.$emit('load-selected-favorite', streamName)
    },
    addFavorite: function (e, streamName) {
      e.preventDefault()
      if (streamName) {
        this.$emit('favorite-channel', streamName)
      }
    }
  }
}
