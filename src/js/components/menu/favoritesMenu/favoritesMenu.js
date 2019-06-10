import MenuItem from './../../menu/menuItem/MenuItem.vue'
import StreamFavoritesControls from './../../streamFavorites/streamFavoritesControls/StreamFavoritesControls.vue'

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
  }
}
