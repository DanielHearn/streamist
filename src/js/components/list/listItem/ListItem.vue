<template>
  <div class="list-item">
    <div class="item-header">
      <div class="row">
        <span 
        v-if="handleActive"
        class="material-icons handle text--green">drag_handle</span>
        <p>{{ itemName }}</p>
      </div>
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