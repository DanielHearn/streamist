// TODO: Hide other edits on edit open
Vue.component('preset-options', {
  props: ['streamPresets', 'currentStreams'],
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
  template: `<div class="option">
              <div class="option-header">
                <p class="text-heading">Presets</p>
                <close-button 
                  v-on:close="closeOptions"
                  title="Close Settings">
                </close-button>
              </div>
              <input-form 
                v-on:submit="createPreset"
                placeholder="Preset Name"></input-form>
              <p class="text" v-if="presetsDisabled">No presets saved</p>
              <ul class="preset-list" v-if="!presetsDisabled">
                <preset-listing
                  v-for="preset in streamPresets"
                  :preset="preset"
                  v-on:load-preset="loadPreset"
                  v-on:update-preset="updatePreset"
                  v-on:delete-preset="deletePreset">
                </preset-listing>
              </ul>
              <button class="button--green" @click="saveCurrentAsPreset" :disabled="noStreams">Save Streams as Preset</button>
              <button class="button--green" @click="clearPresets" :disabled="presetsDisabled">Clear Presets</button>
            </div>`,
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
      const newPresets = this.streamPresets.filter(preset => preset.index !== removedPreset.index)
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
      const newPreset = {
        name: presetName,
        streams: presetStreams,
        index: this.streamPresets.length
      }
      return newPreset
    },
    createEmptyPreset: function (presetName) {
      return this.createPresetObject(presetName, [])
    },
    updatePreset: function (updatedPreset) {
      const tempPresets = this.streamPresets
      for (const preset in tempPresets) {
        if (preset.index === updatedPreset.index) {
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
      console.log(this.streamPresets)
      const newPreset = this.createEmptyPreset(presetName)
      const newPresets = this.streamPresets.concat(newPreset)
      console.log(newPresets)
      this.updatePresets(newPresets)
    },
    clearPresets: function () {
      this.updatePresets([])
    },
    closeOptions: function () {
      this.$emit('close-options')
    }
  }
})

