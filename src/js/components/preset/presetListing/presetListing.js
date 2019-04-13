import draggable from 'vuedraggable'
import InputForm from 'Components/inputs/inputForm/InputForm.vue'
import IconButton from 'Components/inputs/buttons/iconButton/IconButton.vue'
import ListItem from 'Components/list/listItem/ListItem.vue'
import List from 'Components/list/list/List.vue'
import StandardButton from 'Components/inputs/buttons/standardButton/StandardButton.vue'

import Icons from 'Js/icons/'

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
    },
    smallInterface: {
      default: false,
      type: Boolean,
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
  icons: Icons,
  watch: {
    presetName: function () {
      const tempPreset = this.preset
      tempPreset.name = this.presetName
      this.$emit('update-preset', tempPreset)
    },
    'preset.streams': function () {
      this.orderedStreams = this.preset.streams
    },
    orderedStreams: function () {
      const tempPreset = this.preset
      tempPreset.streams = this.orderedStreams
      this.$emit('update-preset', tempPreset)
    }
  },
  methods: {
    nameChange: function (newName) {
      this.presetName = newName
    },
    deleteStreamFromPreset: function (index) {
      const tempPreset = this.preset
      tempPreset.streams.splice(index, 1)
      this.$emit('update-preset', tempPreset)
    },
    loadPreset: function () {
      this.$emit('load-preset', this.preset)
    },
    deletePreset: function () {
      this.$emit('delete-preset', this.preset)
    },
    toggleEditMode: function () {
      this.$emit('edit-preset', this.preset.id)
    },
    newPresetStream: function (e, newPresetStreamName) {
      e.preventDefault()
      if (!newPresetStreamName) {
        return false
      }
      const updatedPreset = this.preset
      updatedPreset.streams = updatedPreset.streams.concat([
        newPresetStreamName
      ])
      this.$emit('update-preset', updatedPreset)
    }
  }
}
