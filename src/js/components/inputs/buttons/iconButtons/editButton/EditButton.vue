<template>
  <icon-button
    :disabled="disabled"
    :iconName="iconName"
    @click.native="edit">
  </icon-button>
</template>

<script src="./editButton.js"></script>