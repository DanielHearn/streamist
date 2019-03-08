<template>
  <div class="list-item">
    <div class="item-header">
      <div class="row">
        <span v-if="handleActive" class="material-icons handle text--green">drag_handle</span>
        <input v-if="canEditTitle" type="text" contenteditable="true" v-model="title">
        <p v-else>{{ itemName }}</p>
      </div>
      <standard-button
        v-if="actionName && !actionNameIsIcon"
        @click.native="$emit('click')"
        :disabled="false"
        :buttonClasses="'button--green'"
        :title="actionTitle"
      >{{ actionName }}</standard-button>
      <icon-button
        v-if="actionName && actionNameIsIcon"
        @click.native="$emit('click')"
        :iconName="actionName"
        :title="actionTitle"
      ></icon-button>
    </div>
    <div class="item-content" v-if="!!$slots.default">
      <slot></slot>
    </div>
  </div>
</template>

<script src="./listItem.js"></script>

<style lang="scss">
@import "./listItem.scss";
</style>