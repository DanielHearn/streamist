<template>
  <icon-button
    :buttonClasses="'button--secondary'"
    :disabled="disabled"
    :iconName="'fullscreen'"
    @click.native="toggleFullscreen"
  ></icon-button>
</template>

<script src="./fullscreenButton.js"></script>