<template>
  <div
  class="layout-demo-wrap"
  @click="$emit('change-layout', layout)"
  >
    <p class="layout-demo-name">{{ layout.name }}</p>
    <div
      class="layout-demo"
      :class="layoutClass"
      v-if="currentStreams.length">
      <div
      class="layout-demo-stream"
      v-for="(stream, index) in currentStreams"
      :title="stream.streamName"
      :key="stream.embedPlayerID">
        <div class="layout-demo-number">
          <p v-if="currentStreams.length < 8">{{ index + 1 }}</p>
        </div>
      </div>
    </div>
    <div
      class="layout-demo"
      :class="layoutClass"
      v-if="!currentStreams.length">
      <div
      class="layout-demo-stream">
        <div class="layout-demo-number">
          <p>1</p>
        </div>
      </div>
      <div
      class="layout-demo-stream">
        <div class="layout-demo-number">
          <p>2</p>
        </div>
      </div>
      <div
      class="layout-demo-stream">
        <div class="layout-demo-number">
          <p>3</p>
        </div>
      </div>
      <div
      class="layout-demo-stream">
        <div class="layout-demo-number">
          <p>4</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./layoutDemo.js"></script>

<style lang="scss">
  @import './layoutDemo.scss';
</style>