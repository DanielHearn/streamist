<template>
  <div class="button-container">
    <button
      class="button--green"
      @click="toggle"
      :disabled="disabled">
      <i class="material-icons">menu</i>
    </button>
  </div>
</template>

<script src="./menuButton.js"></script>