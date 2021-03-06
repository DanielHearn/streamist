import MenuItem from './../../menu/menuItem/MenuItem.vue'
import PresetListing from './../../preset/presetListing/PresetListing.vue'
import InputForm from './../../inputs/inputForm/InputForm.vue'
import StandardButton from './../../inputs/buttons/standardButton/StandardButton.vue'
import List from './../../list/list/List.vue'
import { generateID } from './../../../utilities'

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
    },
    smallInterface: {
      type: Boolean,
      required: false,
      default: false
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
      for (let i = 0; i < newPreset.streams.length; i++) {
        newPreset.streams[i] = Object.assign({}, newPreset.streams[i])
        delete newPreset.streams[i].embedPlayerID
      }
      const newPresets = [newPreset].concat(this.streamPresets)
      this.$store.commit('setPresets', newPresets)
    },
    createPresetObject: function (presetName, presetStreams) {
      return {
        name: presetName,
        streams: presetStreams,
        id: generateID()
      }
    },
    createPreset: function (presetName) {
      if (!presetName) {
        return false
      }
      const newPreset = this.createPresetObject(presetName, [])
      const newPresets = [newPreset].concat(this.streamPresets)
      this.$store.commit('setPresets', newPresets)
    },
    clearPresets: function () {
      this.$store.commit('setPresets', [])
    }
  }
}
