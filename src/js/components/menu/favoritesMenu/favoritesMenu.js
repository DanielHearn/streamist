import MenuItem from 'Components/menu/menuItem/MenuItem.vue'
import StreamFavoritesControls from 'Components/streamFavorites/streamFavoritesControls/StreamFavoritesControls.vue'

export default {
  name: 'favorites-menu',
  components: {
    MenuItem,
    StreamFavoritesControls
  },
  props: {
    streamFavorites: {
      default: [],
      type: Array,
      required: true
    }
  },
  methods: {
    loadSelectedFavorite: function (streamName) {
      this.$emit('load-selected-favorite', streamName)
    },
    unfavoriteChannel: function (streamName) {
      this.$emit('unfavorite-channel', streamName)
    },
    favoriteChannel: function (streamName) {
      this.$emit('favorite-channel', streamName)
    }
  }
}
