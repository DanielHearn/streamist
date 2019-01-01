<template>
  <div class="button-container"><button class="button--green" @click="remove">
    <i class="material-icons">delete</i>
  </button></div>
</template>

<script>
export default {
  methods: {
    remove: function () {
      this.$emit('remove')
    }
  }
}
</script>