<template>
  <div class="menu-item">
    <div class="menu-item-header">
      <p class="text-heading">{{title}}</p>
      <icon-button
        class="button--secondary"
        @click.native="$emit('close-menu-item')"
        :title="closeTitle"
        :iconName="$options.icons.close"
      ></icon-button>
    </div>
    <div class="menu-item-content">
      <slot></slot>
    </div>
  </div>
</template>

<script src="./menuItem.js"></script>

<style lang="scss">
@import "./menuItem.scss";
</style>