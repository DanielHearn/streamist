<template>
  <div class="button-container">
    <button class="button--green" @click="close">
      <i class="material-icons">close</i>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    close: function () {
      this.$emit('close')
    }
  }
}
</script>