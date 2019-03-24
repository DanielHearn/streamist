<template>
  <div class="stream" :class="[{active: hover}, 'stream--' + currentStream.embedPlayerID]">
    <div v-if="displayControls">
      <control-bar :class="{active: componentHover || hover}">
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
        >{{ currentStream.streamName }}</a>
        <icon-button
          :iconName="favorited ? $options.icons.favorited : $options.icons.unfavorited"
          :title="favorited ? 'Remove channel from favorites' : 'Add channel to favorites'"
          @click.native="favoriteChannel"
        />
        <icon-button
          :iconName="$options.icons.refresh"
          title="Refresh Stream"
          @click.native="refresh"
        />
        <icon-button
          :iconName="$options.icons.remove"
          title="Remove Stream"
          @click.native="remove"
        />
      </control-bar>
    </div>
    <div class="stream-main">
      <div class="stream-overlay" :class="{active: hover}"></div>
      <div class="stream-player" draggable="false" :id="currentStream.embedPlayerID"></div>
    </div>
  </div>
</template>

<script src="./streamItem.js"></script>

<style lang="scss">
@import "./streamItem.scss";
</style>