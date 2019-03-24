<template>
  <menu-item
    :title="'Stream Presets'"
    :closeTitle="'Close Settings'"
    v-on:close-menu-item="$emit('close-menu')"
  >
    <div class="menu-item-row">
      <input-form v-on:submit="createPreset" placeholder="Preset Name" buttonText="Create"></input-form>
    </div>
    <div class="menu-item-row">
      <p class="text" v-if="presetsDisabled">No presets saved</p>
      <list v-if="!presetsDisabled">
        <preset-listing
          v-for="preset in streamPresets"
          :key="preset.id"
          :preset="preset"
          :editMode="currentlyEditedPreset == preset.id"
          v-on:load-preset="loadPreset"
          v-on:update-preset="updatePreset"
          v-on:delete-preset="deletePreset"
          v-on:edit-preset="editPreset"
        ></preset-listing>
      </list>
    </div>
    <div class="menu-item-row">
      <standard-button
        @click.native="saveCurrentAsPreset"
        :disabled="noStreams"
        :buttonClasses="'button--secondary'"
      >Save Streams as Preset</standard-button>
      <standard-button
        @click.native="clearPresets"
        :disabled="presetsDisabled"
        :buttonClasses="'button--secondary'"
      >Clear Presets</standard-button>
    </div>
  </menu-item>
</template>

<script src="./presetMenu.js"></script>

<style lang="scss">
@import "./presetMenu.scss";
</style>