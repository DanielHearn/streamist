import draggable from 'vuedraggable'
import InputForm from './../inputForm/InputForm.vue'
import LoadButton from './../buttons/loadButton/LoadButton.vue'
import EditButton from './../buttons/editButton/EditButton.vue'
import RemoveButton from './../buttons/removeButton/RemoveButton.vue'

export default {
  name: 'preset-listing',
  components: {
    draggable,
    InputForm,
    LoadButton,
    EditButton,
    RemoveButton
  },
  props: ['preset'],
  data: function () {
    return {
      orderedStreams: this.preset.streams,
      presetName: this.preset.name,
      editMode: false
    }
  },
  watch: {
    'presetName': function () {
      const tempPreset = this.preset
      tempPreset.name = this.presetName
      this.$emit('update-preset', tempPreset)
    },
    'preset.streams': function () {
      this.orderedStreams = this.preset.streams
    },
    'orderedStreams': function () {
      const tempPreset = this.preset
      tempPreset.streams = this.orderedStreams
      this.$emit('update-preset', tempPreset)
    }
  },
  methods: {
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
      this.editMode = !this.editMode
    },
    newPresetStream: function (e, newPresetStreamName) {
      e.preventDefault()
      if (!newPresetStreamName) {
        return false
      }
      const updatedPreset = this.preset
      updatedPreset.streams = updatedPreset.streams.concat([newPresetStreamName])
      this.$emit('update-preset', updatedPreset)
    }
  }
}
