<template>
  <div class="option">
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
  </div>
</template>

<script src="./presetOptions.js"></script>

<style src="./presetOptions.scss"></style>