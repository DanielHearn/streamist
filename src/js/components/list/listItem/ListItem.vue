<template>
  <div class="list-item">
    <div class="item-header">
      <span v-if="handleActive" class="material-icons handle text--accent">drag_handle</span>
      <div class="item-header-content">
        <div class="row">
          <input v-if="canEditTitle" type="text" contenteditable="true" v-model="title">
          <p v-else>{{ itemName }}</p>
        </div>
        <standard-button
          v-if="actionName && !actionNameIsIcon"
          @click.native="$emit('click')"
          :disabled="actionDisabled"
          :buttonClasses="actionClass"
          :title="actionTitle"
        >{{ actionName }}</standard-button>
        <icon-button
          v-if="actionName && actionNameIsIcon"
          @click.native="$emit('click')"
          :disabled="actionDisabled"
          :iconName="actionName"
          :title="actionTitle"
          :buttonClasses="actionClass"
        ></icon-button>
      </div>
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