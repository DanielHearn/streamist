<template>
  <standard-button
    :disabled="disabled"
    :buttonClasses="buttonClasses"
    :class="warningClass"
    class="button--icon"
  >
    <i class="material-icons" :class="iconClasses">{{iconName}}</i>
    <slot></slot>
  </standard-button>
</template>

<script src="./iconButton.js"></script>