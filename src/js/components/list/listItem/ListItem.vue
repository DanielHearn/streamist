<template>
  <div class="list-item">
    <div class="item-header">
      <span v-if="handleActive" class="material-icons handle text--accent">drag_handle</span>
      <div class="item-header-content">
        <slot name="header"></slot>
      </div>
    </div>
    <div class="item-content" v-if="!!$slots.content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script src="./listItem.js"></script>

<style lang="scss">
@import "./listItem.scss";
</style>