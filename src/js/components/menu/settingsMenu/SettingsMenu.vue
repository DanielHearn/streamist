<template>
  <menu-item
    :title="'Settings'"
    :closeTitle="'Close Settings'"
    v-on:close-menu-item="$emit('close-menu')"
  >
    <template slot="content">
      <div class="menu-item-row">
        <p>This will clear stored options, history, favorites, and presets.</p>
        <standard-button
          @click.native="clearData"
          :buttonClasses="'button--secondary'"
        >Clear Application Data</standard-button>
      </div>
    </template>
  </menu-item>
</template>

<script src="./settingsMenu.js"></script>

<style lang="scss">
@import "./settingsMenu.scss";
</style>