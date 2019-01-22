<template>
  <div class="button-container">
    <button
      class="button--green"
      @click="remove"
      :disabled="disabled">
      <i class="material-icons">delete</i>
    </button>
  </div>
</template>

<script src="./removeButton.js"></script>