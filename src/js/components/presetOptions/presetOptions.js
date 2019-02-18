
import MenuItem from 'Components/menuItem/MenuItem.vue'
import PresetListing from 'Components/presetListing/PresetListing.vue'
import InputForm from 'Components/inputForm/InputForm.vue'
import StandardButton from 'Components/buttons/standardButton/StandardButton.vue'
import { generateID } from 'Js/utilities'

export default {
  name: 'preset-options',
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
      return this.currentStreams.length === 0
    },
    presetsDisabled: function () {
      return this.streamPresets.length === 0
    },
    stringifiedPresets: function () {
      return JSON.stringify(this.streamPresets)
    }
  },
  methods: {
    copyToClipboard: function (str) {
      const el = document.createElement('textarea') // Create a <textarea> element
      el.value = str // Set its value to the string that you want copied
      el.setAttribute('readonly', '') // Make it readonly to be tamper-proof
      el.style.position = 'absolute'
      el.style.left = '-9999px' // Move outside the screen to make it invisible
      document.body.appendChild(el) // Append the <textarea> element to the HTML document
      const selected =
        document.getSelection().rangeCount > 0 // Check if there is any content selected previously
          ? document.getSelection().getRangeAt(0) // Store selection if found
          : false // Mark as false to know no selection existed before
      el.select() // Select the <textarea> content
      document.execCommand('copy') // Copy - only works as a result of a user action (e.g. click events)
      document.body.removeChild(el) // Remove the <textarea> element
      if (selected) { // If a selection existed before copying
        document.getSelection().removeAllRanges() // Unselect everything on the HTML document
        document.getSelection().addRange(selected) // Restore the original selection
      }
    },
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
    },
    closeOptions: function () {
      this.$emit('close-options')
    }
  }
}
