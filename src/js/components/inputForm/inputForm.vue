<template>
  <form class="input-form" name="input" v-on:submit.prevent="submit">
    <input type="text" name="input" required="required" :placeholder="placeholder" v-model="inputValue" />
    <standard-button type="submit">Add</standard-button>
  </form>
</template>

<script src="./inputForm.js"></script>