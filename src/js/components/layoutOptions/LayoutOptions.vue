<template>
  <div class="option">
    <div class="option-header">
      <p class="text-heading">Layouts</p>
      <close-button v-on:close="closeOptions" title="Close Help"></close-button>
    </div>
    <p>Current Layout</p>
    <select v-model="selectedLayout">
        <option v-for="layout in availableLayouts" :key="layout">{{ layout }}</option>
    </select>
  </div>
</template>

<script src="./layoutOptions.js"></script>