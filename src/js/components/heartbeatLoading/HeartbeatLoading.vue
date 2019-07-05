<template>
  <div class="heartbeatLoading" :class="{hidden: !active}">
    <div class="pulse" v-bind:style="styles"></div>
    <div class="pulse" v-bind:style="styles"></div>
  </div>
</template>

<script src="./heartbeatLoading.js"></script>

<style lang="scss">
@import "./heartbeatLoading.scss";
</style>