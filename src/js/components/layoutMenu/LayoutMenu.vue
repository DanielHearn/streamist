<template>
  <menu-item
    :title="'Layouts'"
    :closeTitle="'Close Layout Options'"
    v-on:close-menu-item="$emit('close-menu')"
    >
    <div class="menu-item-row">
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
    </div>
  </menu-item>
</template>

<script src="./layoutMenu.js"></script>

<style lang="scss">
  @import './layoutMenu.scss';
</style>