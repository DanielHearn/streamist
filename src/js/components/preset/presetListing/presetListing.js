import draggable from 'vuedraggable'
import InputForm from 'Components/inputs/inputForm/InputForm.vue'
import IconButton from 'Components/inputs/buttons/iconButton/IconButton.vue'
import ListItem from 'Components/list/listItem/ListItem.vue'
import List from 'Components/list/list/List.vue'
import StandardButton from 'Components/inputs/buttons/standardButton/StandardButton.vue'

import Icons from 'Js/icons/'
import { createStreamObject, generateID } from 'Js/utilities'

export default {
  name: 'preset-listing',
  components: {
    draggable,
    InputForm,
    IconButton,
    StandardButton,
    ListItem,
    List
  },
  props: {
    preset: {
      type: Object,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data: function () {
    return {
      orderedStreams: this.preset.streams,
      presetName: this.preset.name,
      drag: false
    }
  },
  computed: {
    emptyPresetName: function () {
      return this.presetName.length === 0
    }
  },
  icons: Icons,
  watch: {
    presetName: function () {
      const updatedPreset = this.preset
      updatedPreset.name = this.presetName
      this.$store.commit('updatePreset', updatedPreset)
    },
    'preset.streams': function () {
      this.orderedStreams = this.preset.streams
    },
    orderedStreams: function () {
      const updatedPreset = this.preset
      updatedPreset.streams = this.orderedStreams
      this.$store.commit('updatePreset', updatedPreset)
    }
  },
  methods: {
    nameChange: function (newName) {
      this.presetName = newName
    },
    deleteStreamFromPreset: function (index) {
      const updatedPreset = this.preset
      updatedPreset.streams.splice(index, 1)
      this.$store.commit('updatePreset', updatedPreset)
    },
    loadPreset: function () {
      const streams = this.preset.streams
      this.$store.commit('setStreams', [])
      if (streams && streams.length) {
        for (let i = 0; i < streams.length; i++) {
          this.$store.commit('addStream', streams[i])
        }
      }
    },
    deletePreset: function () {
      this.$store.commit('removePresetFromPresets', this.preset)
    },
    toggleEditMode: function () {
      this.$emit('edit-preset', this.preset.id)
    },
    newPresetStream: function (newPresetStreamName) {
      if (!newPresetStreamName) {
        return false
      }
      const updatedPreset = this.preset
      updatedPreset.streams = updatedPreset.streams.concat([
        createStreamObject(newPresetStreamName, generateID())
      ])
      this.$store.commit('updatePreset', updatedPreset)
    }
  }
}
