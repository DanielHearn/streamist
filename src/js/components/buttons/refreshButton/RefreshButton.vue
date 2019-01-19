<template>
  <div class="button-container">
    <button class="button--green" @click="refresh">
      <i class="material-icons">refresh</i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'refresh-button',
  methods: {
    refresh: function () {
      this.$emit('refresh')
    }
  }
}
</script>