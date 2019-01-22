<template>
  <div class="button-container">
    <button 
      class="button--green"
      @click="edit"
      :disabled="disabled">
      <span class="material-icons" :class="{hidden: active}">edit</span>
      <span class="material-icons" :class="{hidden: !active}">close</span>
    </button>
  </div>
</template>

<script src="./editButton.js"></script>