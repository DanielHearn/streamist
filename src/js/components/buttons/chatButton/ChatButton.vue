<template>
  <div class="button-container">
    <button
      class="button--green"
      @click="toggle"
      :disabled="disabled">
      <i class="material-icons">chat</i>
    </button>
  </div>
</template>

<script src="./chatButton.js"></script>