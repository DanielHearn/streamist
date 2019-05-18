import StandardButton from 'Components/inputs/buttons/standardButton/StandardButton.vue'
import IconButton from 'Components/inputs/buttons/iconButton/IconButton.vue'
import List from 'Components/list/list/List.vue'
import ListItem from 'Components/list/listItem/ListItem.vue'
import InputForm from 'Components/inputs/inputForm/InputForm.vue'

import Icons from 'Js/icons'
import { generateID, createStreamObject } from 'Js/utilities'

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
    }
  },
  icons: Icons,
  computed: {
    favoritesAvailable: function () {
      return this.streamFavorites.length > 0
    }
  },
  methods: {
    loadFavorite: function (stream) {
      this.$store.commit(
        'addStream',
        createStreamObject(stream.streamName, generateID())
      )
    },
    favoriteChannel: function (streamName) {
      this.$store.commit(
        'addStreamToFavorites',
        createStreamObject(streamName, generateID())
      )
    },
    unfavoriteChannel: function (stream) {
      this.$store.commit('removeStreamFromFavorites', stream)
    }
  }
}
