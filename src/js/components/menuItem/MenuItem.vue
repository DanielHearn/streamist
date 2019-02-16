<template>
  <div class="option">
    <div class="option-header">
      <p class="text-heading">{{title}}</p>
      <close-button
        @click.native="closeMenuItem"
        :title="closeTitle">
      </close-button>
    </div>
    <div class="option-content">
      <slot></slot>
    </div>
  </div>
</template>

<script src="./menuItem.js"></script>