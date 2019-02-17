<template>
  <menu-item
    :title="'Layouts'"
    :closeTitle="'Close Layout Options'"
    v-on:close-menu-item="closeOptions"
    >
      <p>Select a layout</p>
      <div class="layouts-demo-container">
        <layout-demo
          v-for="layout in availableLayouts"
          :key="layout.slug"
          :class="{'active': selectedLayout.id === layout.id}"
          :layout="layout"
          :currentStreams="currentStreams"
          v-on:change-layout="changeLayout">
        </layout-demo>
      </div>
  </menu-item>
</template>

<script src="./layoutOptions.js"></script>

<style lang="scss">
  @import './layoutOptions.scss';
</style>