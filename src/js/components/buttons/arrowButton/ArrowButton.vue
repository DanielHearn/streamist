<template>
  <div class="button-container">
    <button 
      class="button--green"
      @click="toggle"
      :disabled="disabled"
      :title="buttonTitle">
      <i 
        v-if="direction === 'left'"
        class="material-icons">
        arrow_back</i>
      <i 
        v-else
        class="material-icons">
        arrow_forward</i>
    </button>
  </div>
</template>

<script src="./arrowButton.js"></script>