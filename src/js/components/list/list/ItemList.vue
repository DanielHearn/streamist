<template>
  <ul class="list" :class="[layoutClass]">
    <slot></slot>
  </ul>
</template>

<script src="./list.js"></script>

<style lang="scss">
@import "./list.scss";
</style>