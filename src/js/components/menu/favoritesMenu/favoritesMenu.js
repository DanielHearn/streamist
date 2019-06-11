import MenuItem from './../../menu/menuItem/MenuItem.vue'
import StandardButton from './../../inputs/buttons/standardButton/StandardButton.vue'
import IconButton from './../../inputs/buttons/iconButton/IconButton.vue'
import List from './../../list/list/List.vue'
import ListItem from './../../list/listItem/ListItem.vue'
import InputForm from './../../inputs/inputForm/InputForm.vue'

import Icons from './../../../icons'
import { generateID, createStreamObject } from './../../../utilities'

export default {
  name: 'favorites-menu',
  components: {
    MenuItem,
    StandardButton,
    List,
    ListItem,
    IconButton,
    InputForm
  },
  icons: Icons,
  props: {
    streamFavorites: {
      default: [],
      type: Array,
      required: true
    }
  },
  computed: {
    favoritesAvailable: function () {
      return this.streamFavorites.length > 0
    }
  },
  methods: {
    clearFavorites: function () {
      this.$store.commit('setFavorites', [])
    },
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
