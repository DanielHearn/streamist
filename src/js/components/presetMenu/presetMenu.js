
import MenuItem from 'Components/menuItem/MenuItem.vue'
import PresetListing from 'Components/presetListing/PresetListing.vue'
import InputForm from 'Components/inputForm/InputForm.vue'
import StandardButton from 'Components/buttons/standardButton/StandardButton.vue'
import { generateID } from 'Js/utilities'

export default {
  name: 'preset-menu',
  components: {
    MenuItem,
    PresetListing,
    InputForm,
    StandardButton
  },
  props: {
    streamPresets: {
      type: Array,
      required: true
    },
    currentStreams: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      importPresetsOpened: false,
      importedPresets: JSON.stringify(this.streamPresets)
    }
  },
  computed: {
    noStreams: function () {
      return !this.currentStreams.length
    },
    presetsDisabled: function () {
      return !this.streamPresets.length
    },
    stringifiedPresets: function () {
      return JSON.stringify(this.streamPresets)
    }
  },
  methods: {
    deletePreset: function (removedPreset) {
      const newPresets = this.streamPresets.filter(preset => preset.id !== removedPreset.id)
      this.updatePresets(newPresets)
    },
    loadPreset: function (preset) {
      this.$emit('load-preset', preset)
    },
    saveCurrentAsPreset: function () {
      const presetName = `Preset ${this.streamPresets.length + 1}`
      const newPreset = this.createEmptyPreset(presetName, [])
      newPreset.streams = this.currentStreams.map(stream => stream.streamName)
      const newPresets = this.streamPresets.concat(newPreset)
      this.updatePresets(newPresets)
    },
    createPresetObject: function (presetName, presetStreams) {
      return {
        name: presetName,
        streams: presetStreams,
        id: generateID(8)
      }
    },
    createEmptyPreset: function (presetName) {
      return this.createPresetObject(presetName, [])
    },
    updatePreset: function (updatedPreset) {
      const tempPresets = this.streamPresets
      for (const preset in tempPresets) {
        if (preset.id === updatedPreset.id) {
          preset.name = updatedPreset.name
          preset.streams = updatedPreset.streams
        }
      }
      this.updatePresets(tempPresets)
    },
    updatePresets: function (newPresets) {
      this.$emit('update-presets', newPresets)
    },
    createPreset: function (e, presetName) {
      e.preventDefault()
      if (!presetName) {
        return false
      }
      const newPreset = this.createEmptyPreset(presetName)
      const newPresets = this.streamPresets.concat(newPreset)
      this.updatePresets(newPresets)
    },
    clearPresets: function () {
      this.updatePresets([])
    }
  }
}
