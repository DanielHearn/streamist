<template>
  <menu-item
    :title="'Settings'"
    :closeTitle="'Close Settings'"
    v-on:close-menu-item="$emit('close-menu')"
  >
    <div class="menu-item-row">
      <standard-button
        @click.native="clearData"
        :buttonClasses="'button--secondary'"
      >Clear Application Data</standard-button>
    </div>
  </menu-item>
</template>

<script src="./settingsMenu.js"></script>

<style lang="scss">
@import "./settingsMenu.scss";
</style>