<template>
  <div class="heartbeatLoading" :class="{hidden: !active}">
    <div class="pulse"></div>
    <div class="pulse"></div>
  </div>
</template>

<script src="./heartbeatLoading.js"></script>

<style lang="scss">
@import "./heartbeatLoading.scss";
</style>