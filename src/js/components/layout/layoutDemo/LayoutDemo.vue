<template>
  <list-item @click.native="$emit('change-layout', layout)">
    <template slot="header">
      <div class="column">
        <p>{{ layout.name }}</p>
      </div>
      <div class="column">
        <icon-button v-if="smallInterface" :iconName="$options.icons.apply" title="Set Layout" />
        <standard-button v-else :buttonClasses="'button--accent button--text'">Set Layout</standard-button>
      </div>
    </template>
    <template slot="content">
      <div class="layout-demo" :class="[layoutClass, streamLengthClass]" v-if="streams.length > 2">
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
      <div class="layout-demo streams--5" :class="[layoutClass]" v-else>
        <div v-for="index in [1, 2, 3, 4, 5]" :key="index" class="layout-demo-stream">
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