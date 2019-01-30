<template>
  <div class="option">
    <div class="option-header">
      <p class="text-heading">Layouts</p>
      <close-button v-on:close="closeOptions" title="Close Help"></close-button>
    </div>
    <p>Select Layout</p>
    <div class="layouts-demo-container">
      <p>Grid</p>
      <div class="layout-demo-wrap">
        <div
          class="layout-demo layout-demo--layout-grid"
          @click="selectedLayout = 'grid'"
          :class="{'active': selectedLayout === 'grid'}">
          <div
          class="layout-demo-stream"
          v-for="stream in streams"
          :key="stream.embedPlayerID"
          >
            <div class="layout-demo-number">
              <p>{{ stream.index }}</p>
            </div>
          </div>
        </div>
      </div>
      <p>Column</p>
      <div class="layout-demo-wrap">
        <div
        class="layout-demo layout-demo--layout-column"
        @click="selectedLayout = 'column'"
        :class="{'active': selectedLayout === 'column'}">
          <div
          class="layout-demo-stream"
          v-for="stream in streams"
          :key="stream.embedPlayerID"
          >
            <div class="layout-demo-number">
              <p>{{ stream.index }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./layoutOptions.js"></script>

<style lang="scss">
  @import './layoutOptions.scss';
</style>