<template>
  <div class="stream-controls">
    <span
      v-if="numStreams > 1"
      class="material-icons handle text--white"
      title="Reorder stream"
    >drag_handle</span>
    <a
      class="url"
      :href="streamUrl"
      target="_blank"
      title="Open Twitch stream"
    >{{ stream.streamName }}</a>
    <icon-button :iconName="$options.icons.refresh" title="Refresh Stream" @click.native="refresh"/>
    <icon-button :iconName="$options.icons.remove" title="Remove Stream" @click.native="remove"/>
  </div>
</template>

<script src="./streamControls.js"></script>

<style lang="scss">
@import "./streamControls.scss";
</style>