<template>
  <section class="intro-content">
    <h1 class="intro-title">MANYTWITCH</h1>
    <h2 class="intro-subheading">Multiple Twitch Stream Viewer</h2>
    <p class="intro-text">Enter a twitch channel to start or watch one of the streams below.</p>
    <slot name="content"></slot>
  </section>
</template>

<script src="./intro.js"></script>

<style lang="scss">
@import "./intro.scss";
</style>