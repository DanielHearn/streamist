import StandardButton from './../../inputs/buttons/standardButton/StandardButton.vue'
import IconButton from './../../inputs/buttons/iconButton/IconButton.vue'
import List from './../../list/list/List.vue'
import ListItem from './../../list/listItem/ListItem.vue'
import InputForm from './../../inputs/inputForm/InputForm.vue'

import Icons from './../../../icons'
import { generateID, createStreamObject } from './../../../utilities'

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
    },
    clearFavorites: function () {
      this.$store.commit('setFavorites', [])
    }
  }
}
