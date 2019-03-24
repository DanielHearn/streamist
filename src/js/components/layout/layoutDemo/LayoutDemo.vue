<template>
  <list-item
    :itemName="layout.name"
    :actionName="'Set Layout'"
    @click.native="$emit('change-layout', layout)"
  >
    <template slot="content">
      <div class="layout-demo" :class="[layoutClass, streamLengthClass]" v-if="streams.length > 1">
        <div
          class="layout-demo-stream"
          v-for="(stream, index) in streams"
          :title="stream.streamName"
          :key="stream.embedPlayerID"
        >
          <div class="layout-demo-number">
            <p v-if="streams.length < 8">{{ index + 1 }}</p>
          </div>
        </div>
      </div>
      <div class="layout-demo" :class="[layoutClass, streamLengthClass]" v-else>
        <div v-for="index in [1, 2, 3, 4]" :key="index" class="layout-demo-stream">
          <div class="layout-demo-number">
            <p>{{ index }}</p>
          </div>
        </div>
      </div>
    </template>
  </list-item>
</template>

<script src="./layoutDemo.js"></script>

<style lang="scss">
@import "./layoutDemo.scss";
</style>