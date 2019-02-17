<template>
  <menu-item
    :title="'Presets'"
    :closeTitle="'Close Settings'"
    v-on:close-menu-item="closeOptions"
    >
      <input-form 
        v-on:submit="createPreset"
        placeholder="Preset Name"></input-form>
      <p class="text" v-if="presetsDisabled">No presets saved</p>
      <ul class="preset-list" v-if="!presetsDisabled">
        <preset-listing
          v-for="preset in streamPresets"
          :key="preset.id"
          :preset="preset"
          v-on:load-preset="loadPreset"
          v-on:update-preset="updatePreset"
          v-on:delete-preset="deletePreset">
        </preset-listing>
      </ul>
      <standard-button
        @click.native="saveCurrentAsPreset"
        :disabled="noStreams">Save Streams as Preset</standard-button>
      <standard-button
        @click.native="clearPresets"
        :disabled="presetsDisabled">Clear Presets</standard-button>
  </menu-item>
</template>

<script src="./presetOptions.js"></script>

<style lang="scss">
    @import './presetOptions.scss';
</style>