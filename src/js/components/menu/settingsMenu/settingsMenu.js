import MenuItem from './../../menu/menuItem/MenuItem.vue'
import StandardButton from './../../inputs/buttons/standardButton/StandardButton.vue'

import { getDefault } from './../../../utilities'

export default {
  name: 'settings-menu',
  components: {
    MenuItem,
    StandardButton
  },
  methods: {
    clearData: function () {
      this.$store.commit('setOptions', getDefault('options'))
      this.$store.commit('setFavorites', getDefault('streamFavorites'))
      this.$store.commit('setHistory', getDefault('streamHistory'))
      this.$store.commit('setPresets', getDefault('streamPresets'))
    }
  }
}
