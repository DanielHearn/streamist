import LayoutOptions from 'Components/layoutOptions/LayoutOptions.vue'
import HistoryOptions from 'Components/historyOptions/HistoryOptions.vue'
import PresetOptions from 'Components/presetOptions/PresetOptions.vue'
import HelpOptions from 'Components/helpOptions/HelpOptions.vue'
import About from 'Components/about/About.vue'

export default {
  name: 'menu-container',
  components: {
    LayoutOptions,
    HistoryOptions,
    PresetOptions,
    HelpOptions,
    About
  },
  props: ['options', 'currentStreams', 'streamHistory', 'streamPresets', 'availableLayouts'],
  data: function () {
    return {
      currentOptionCat: ''
    }
  },
  methods: {
    closeOptions: function () {
      this.currentOptionCat = ''
    },
    loadPreset: function (preset) {
      this.$emit('load-preset', preset)
    },
    loadOptionCat: function (cat) {
      if (cat === this.currentOptionCat) {
        this.currentOptionCat = ''
      } else {
        this.currentOptionCat = cat
      }
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
