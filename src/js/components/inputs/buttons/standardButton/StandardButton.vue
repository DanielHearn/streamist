<template>
  <button :class="buttonClasses" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script src="./standardButton.js"></script>