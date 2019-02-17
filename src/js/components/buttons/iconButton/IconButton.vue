<template>
  <standard-button
    :disabled="disabled"
    :buttonClasses="buttonClasses">
    <i class="material-icons" :class="iconClasses">{{iconName}}</i><slot></slot>
  </standard-button>
</template>

<script src="./iconButton.js"></script>