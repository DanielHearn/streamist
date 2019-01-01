<template>
  <div class="button-container">
    <button class="button--green" @click="load">
      <i class="material-icons">play_arrow</i>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    load: function () {
      this.$emit('load')
    }
  }
}
</script>