<template>
  <form class="input-form" name="input" v-on:submit.prevent="submit">
    <input type="text" name="input" required="required" :placeholder="placeholder" v-model="inputValue" />
    <button class="button--green" type="submit">Add</button>
  </form>
</template>

<script src="./inputForm.js"></script>