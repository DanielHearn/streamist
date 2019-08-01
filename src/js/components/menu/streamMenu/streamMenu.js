import draggable from 'vuedraggable'
import MenuItem from './../../menu/menuItem/MenuItem.vue'
import StandardButton from './../../inputs/buttons/standardButton/StandardButton.vue'
import IconButton from './../../inputs/buttons/iconButton/IconButton.vue'
import List from './../../list/list/List.vue'
import ListItem from './../../list/listItem/ListItem.vue'
import InputForm from './../../inputs/inputForm/InputForm.vue'

import Icons from '../../../icons/icons'
import { generateID, createStreamObject } from '../../../utilities/utilities'

export default {
  name: 'stream-menu',
  components: {
    MenuItem,
    StandardButton,
    List,
    ListItem,
    IconButton,
    InputForm,
    draggable
  },
  icons: Icons,
  props: {
    streams: {
      default: [],
      type: Array,
      required: true
    },
    favorites: {
      default: [],
      type: Array,
      required: true
    },
    smallInterface: {
      default: false,
      type: Boolean,
      required: false
    }
  },
  data: function () {
    return {
      orderedStreams: this.streams.slice()
    }
  },
  computed: {
    favorited: function () {
      const favoritedStreams = {}
      this.favorites.forEach(favorite => {
        if (favorite.streamName) {
          favoritedStreams[favorite.streamName] = true
        }
      })
      return favoritedStreams
    }
  },
  watch: {
    orderedStreams: function () {
      this.$store.commit('setStreams', this.orderedStreams)
    },
    streams: function () {
      if (this.orderedStreams !== this.streams) {
        this.orderedStreams = this.streams
      }
    }
  },
  methods: {
    addStream: function (streamName) {
      const streamObj = createStreamObject(streamName, generateID())
      this.$store.commit('addStream', streamObj)
      this.$store.commit('addStreamToHistory', streamObj)
    },
    removeStream: function (stream) {
      this.$store.commit('removeStream', stream)
    },
    favoriteStream: function (stream) {
      this.$store.commit('addStreamToFavorites', stream)
    },
    unfavoriteStream: function (stream) {
      this.$store.commit('removeStreamFromFavorites', stream)
    }
  }
}
