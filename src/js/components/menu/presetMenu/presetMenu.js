import MenuItem from 'Components/menu/menuItem/MenuItem.vue'
import PresetListing from 'Components/preset/presetListing/PresetListing.vue'
import InputForm from 'Components/inputs/inputForm/InputForm.vue'
import StandardButton from 'Components/inputs/buttons/standardButton/StandardButton.vue'
import List from 'Components/list/list/List.vue'
import { generateID } from 'Js/utilities'

export default {
  name: 'preset-menu',
  components: {
    MenuItem,
    PresetListing,
    InputForm,
    StandardButton,
    List
  },
  props: {
    streamPresets: {
      type: Array,
      required: true
    },
    streams: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      currentlyEditedPreset: ''
    }
  },
  computed: {
    noStreams: function () {
      return !this.streams.length
    },
    presetsDisabled: function () {
      return !this.streamPresets.length
    }
  },
  methods: {
    editPreset: function (presetId) {
      this.currentlyEditedPreset =
        this.currentlyEditedPreset === presetId ? '' : presetId
    },
    saveCurrentAsPreset: function () {
      const presetName = `Preset ${this.streamPresets.length + 1}`
      const newPreset = this.createPresetObject(presetName, [])
      newPreset.streams = this.streams.slice()
      const newPresets = this.streamPresets.concat(newPreset)
      this.$store.commit('setPresets', newPresets)
    },
    createPresetObject: function (presetName, presetStreams) {
      return {
        name: presetName,
        streams: presetStreams,
        id: generateID()
      }
    },
    updatePreset: function (updatedPreset) {
      const tempPresets = this.streamPresets
      for (const preset in tempPresets) {
        if (preset.id === updatedPreset.id) {
          preset.name = updatedPreset.name
          preset.streams = updatedPreset.streams
        }
      }
      this.$store.commit('setPresets', tempPresets)
    },
    createPreset: function (presetName) {
      if (!presetName) {
        return false
      }
      const newPreset = this.createPresetObject(presetName, [])
      const newPresets = this.streamPresets.concat(newPreset)
      this.$store.commit('setPresets', newPresets)
    },
    clearPresets: function () {
      this.$store.commit('setPresets', [])
    }
  }
}
