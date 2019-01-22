<template>
  <div class="button-container">
    <button
      class="button--green"
      @click="refresh"
      :disabled="disabled">
      <i class="material-icons">refresh</i>
    </button>
  </div>
</template>

<script src="./refreshButton.js"></script>