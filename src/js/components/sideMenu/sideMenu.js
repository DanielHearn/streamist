import LayoutMenu from 'Components/layoutMenu/layoutMenu.vue'
import HistoryMenu from 'Components/historyMenu/HistoryMenu.vue'
import PresetMenu from 'Components/presetMenu/PresetMenu.vue'
import HelpMenu from 'Components/helpMenu/HelpMenu.vue'
import About from 'Components/about/About.vue'
import IconButton from 'Components/buttons/iconButton/iconButton.vue'

export default {
  name: 'side-menu',
  components: {
    LayoutMenu,
    HistoryMenu,
    PresetMenu,
    HelpMenu,
    About,
    IconButton
  },
  menuItems: [
    {
      itemName: 'Layouts',
      iconName: 'view_module'
    },
    {
      itemName: 'Presets',
      iconName: 'view_list'
    },
    {
      itemName: 'History',
      iconName: 'history'
    },
    {
      itemName: 'Help',
      iconName: 'help'
    },
    {
      itemName: 'About',
      iconName: 'info'
    }
  ],
  props: {
    options: {
      type: Object,
      required: true
    },
    currentStreams: {
      type: Array,
      required: true
    },
    streamHistory: {
      type: Array,
      required: true
    },
    streamPresets: {
      type: Array,
      required: true
    },
    availableLayouts: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      currentMenu: ''
    }
  },
  methods: {
    closeMenu: function () {
      this.currentMenu = ''
    },
    loadMenu: function (menu) {
      this.currentMenu = menu === this.currentMenu ? '' : menu
    },
    loadPreset: function (preset) {
      this.$emit('load-preset', preset)
    },
    loadSelectedHistory: function (streamName) {
      this.$emit('load-selected-history', streamName)
    },
    clearHistory: function () {
      this.$emit('clear-history')
    },
    updatePresets: function (newPresets) {
      this.$emit('update-presets', newPresets)
    },
    changeLayout: function (newLayout) {
      this.$emit('change-layout', newLayout)
    }
  }
}
