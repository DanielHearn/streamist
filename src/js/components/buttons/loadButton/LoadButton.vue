<template>
  <div class="button-container">
    <button
      class="button--green"
      @click="load"
      :disabled="disabled">
      <i class="material-icons">play_arrow</i>
    </button>
  </div>
</template>

<script src="./loadButton.js"></script>