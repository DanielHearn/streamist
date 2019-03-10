import draggable from 'vuedraggable'
import InputForm from 'Components/inputs/inputForm/InputForm.vue'
import LoadButton from 'Components/inputs/buttons/iconButtons/loadButton/LoadButton.vue'
import EditButton from 'Components/inputs/buttons/iconButtons/editButton/EditButton.vue'
import CloseButton from 'Components/inputs/buttons/iconButtons/closeButton/CloseButton.vue'
import RemoveButton from 'Components/inputs/buttons/iconButtons/removeButton/RemoveButton.vue'
import ListItem from 'Components/list/listItem/ListItem.vue'
import List from 'Components/list/list/List.vue'

export default {
  name: 'preset-listing',
  components: {
    draggable,
    InputForm,
    LoadButton,
    EditButton,
    RemoveButton,
    CloseButton,
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
      presetName: this.preset.name
    }
  },
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
      console.log(newName)
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
