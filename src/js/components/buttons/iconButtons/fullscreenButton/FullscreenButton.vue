<template>
  <icon-button
    :disabled="disabled"
    :iconName="'fullscreen'"
    @click.native="toggleFullscreen">
  </icon-button>
</template>

<script src="./fullscreenButton.js"></script>