<template>
  <menu-item
    :title="'Settings'"
    :closeTitle="'Close Settings'"
    v-on:close-menu-item="$emit('close-menu')"
  >
    <div class="menu-item-row">
      <p
        class="text"
      >Clears all local data, this includes: favorites, presets, history, and settings.</p>
      <standard-button
        @click.native="$emit('clear-data')"
        :buttonClasses="'button--secondary'"
      >Clear All Data</standard-button>
    </div>
  </menu-item>
</template>

<script src="./settingsMenu.js"></script>

<style lang="scss">
@import "./settingsMenu.scss";
</style>