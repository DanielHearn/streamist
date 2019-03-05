<template>
  <div class="list-item">
    <div class="item-header">
      <p>{{ itemName }}</p>
      <standard-button
        v-if="actionName"
        @click.native="$emit('click')"
        :disabled="false"
        :buttonClasses="'button--green'">
        {{ actionName }}
      </standard-button>
    </div>
    <div class="item-content">
      <slot></slot>
    </div>
  </div>
</template>

<script src="./listItem.js"></script>

<style lang="scss">
  @import './listItem.scss';
</style>