<template>
  <div class="option">
    <div class="option-header">
      <p class="text-heading">Layouts</p>
      <close-button @click.native="closeOptions" title="Close Help"></close-button>
    </div>
    <div class="option-content">
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
  </div>
</template>

<script src="./layoutOptions.js"></script>

<style lang="scss">
  @import './layoutOptions.scss';
</style>