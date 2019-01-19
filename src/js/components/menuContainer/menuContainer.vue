<template>
  <div class="menu-container" :class="{visible: options.menuVisible}">
    <div class="menu">
      <div class="menu-content">
        <button class="button--dark" @click="loadOptionCat('History')" :class="{active: currentOptionCat === 'History'}">
          <i class="menu-icon material-icons">history</i>
          <p>History</p>
        </button>
        <button class="button--dark" @click="loadOptionCat('Presets')" :class="{active: currentOptionCat === 'Presets'}">
          <i class="menu-icon material-icons">view_module</i>
          <p>Presets</p>
        </button>
        <button class="button--dark" @click="loadOptionCat('Help')" :class="{active: currentOptionCat === 'Help'}">
          <i class="menu-icon material-icons">help</i>
          <p>Help</p>
        </button>
        <button class="button--dark" @click="loadOptionCat('About')" :class="{active: currentOptionCat === 'About'}">
          <i class="menu-icon material-icons">info</i>
          <p>About</p>
        </button>
      </div>
    </div>
    <div class="menu-options">
      <history-options 
        v-if="currentOptionCat === 'History'" 
        :stream-history="streamHistory" 
        v-on:load-selected-history="loadSelectedHistory"
        v-on:clear-history="clearHistory"
        v-on:close-options="closeOptions"
      ></history-options>
      <preset-options 
        v-if="currentOptionCat === 'Presets'"
        :stream-presets="streamPresets"
        :current-streams="currentStreams"
        v-on:update-presets="updatePresets"
        v-on:load-preset="loadPreset"
        v-on:close-options="closeOptions"
      ></preset-options>
      <help-options
        v-if="currentOptionCat === 'Help'"
        v-on:close-options="closeOptions"
      ></help-options>
      <about
        v-if="currentOptionCat === 'About'"
        v-on:close-options="closeOptions"
      ></about>
    </div>
  </div>
</template>

<script>
import HistoryOptions from './../historyOptions/HistoryOptions.vue'
import PresetOptions from './../presetOptions/PresetOptions.vue'
import HelpOptions from './../helpOptions/HelpOptions.vue'
import About from './../about/About.vue'

export default {
  name: 'menu-container',
  components: {
    HistoryOptions,
    PresetOptions,
    HelpOptions,
    About
  },
  props: ['options', 'currentStreams', 'streamHistory', 'streamPresets'],
  data: function () {
    return {
      currentOptionCat: ''
    }
  },
  methods: {
    closeOptions: function () {
      this.currentOptionCat = ''
    },
    loadPreset: function (preset) {
      this.$emit('load-preset', preset)
    },
    loadOptionCat: function (cat) {
      if (cat === this.currentOptionCat) {
        this.currentOptionCat = ''
      } else {
        this.currentOptionCat = cat
      }
    },
    loadSelectedHistory: function (streamName) {
      this.$emit('load-selected-history', streamName)
    },
    clearHistory: function () {
      this.$emit('clear-history')
    },
    updatePresets: function (newPresets) {
      this.$emit('update-presets', newPresets)
    }
  }
}
</script>