<template>
  <form class="input-form" name="input" v-on:submit.prevent="submit">
    <input
      type="text"
      name="input"
      required="required"
      :placeholder="placeholder"
      v-model="inputValue"
      :class="{'input--warning': warning}"
    >
    <icon-button v-if="isIcon" :iconName="buttonIcon" type="submit"/>
    <standard-button v-else type="submit">
      <template>{{buttonText}}</template>
    </standard-button>
  </form>
</template>

<script src="./inputForm.js"></script>

<style lang="scss">
@import "./inputForm.scss";
</style>