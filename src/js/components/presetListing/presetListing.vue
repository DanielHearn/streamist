
Vue.component('preset-listing', {
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
  template: `<li class="preset-listing">
              <input
                type="text"
                contenteditable="true"
                v-model="presetName">
              </input>
              <div class="input-container">
                <load-button
                  v-on:load="loadPreset"
                  title="Load Preset">
                </load-button>
                <edit-button
                  v-on:edit="toggleEditMode"
                  title="Edit Preset">
                </edit-button>
                <remove-button 
                  v-on:remove="deletePreset"
                  title="Delete Preset">
                </remove-button>
              </div>
              <div v-if="editMode">
                <input-form 
                  v-on:submit="newPresetStream"
                  placeholder="Stream Name"></input-form>
                <ul>
                  <draggable 
                    v-model="orderedStreams" 
                    @start="drag=true" 
                    @end="drag=false"
                    :options="{ghostClass:'ghost'}">
                    <li
                      class="draggable"
                      v-for="(stream, index) in orderedStreams"
                      :stream="stream">
                      <span class="material-icons handle text--green">drag_handle</span>
                      <p> {{ stream }}</p> 
                      <remove-button v-on:remove="deleteStreamFromPreset(index)" title="Remove Stream" ></remove-button>
                    </li>
                  </draggable>
                </ul>
              </div>
            </li>`,
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
})
