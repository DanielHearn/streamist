<template>
  <div class="button-container"><button class="button--green" @click="edit">
    <span class="material-icons" :class="{hidden: active}">edit</span>
    <span class="material-icons" :class="{hidden: !active}">close</span>
  </button></div>
</template>

<script>
export default {
  name: 'edit-button',
  data: function () {
    return {
      active: false
    }
  },
  methods: {
    edit: function () {
      this.active = !this.active
      this.$emit('edit')
    }
  }
}
</script>