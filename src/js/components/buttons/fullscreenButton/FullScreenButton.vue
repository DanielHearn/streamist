<template>
  <div 
    class="button-container"
    title="Toggle Fullscreen"
    :disabled="disabled">
    <button class="button--green" @click="toggleFullscreen">
      <i class="material-icons">fullscreen</i>
    </button>
  </div>
</template>

<script src="./fullscreenButton.js"></script>