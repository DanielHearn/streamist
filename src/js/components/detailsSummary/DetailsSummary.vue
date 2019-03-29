<template>
  <details class="details-summary" :class="{'active': active}">
    <summary
      class="details-summary__header text-sub-heading"
      :class="headerClasses"
      @click="toggleActive"
    >
      <slot name="header"></slot>
    </summary>
    <div class="details-summary__content">
      <slot name="content"></slot>
    </div>
  </details>
</template>

<script src="./detailsSummary.js"></script>

<style lang="scss">
@import "./detailsSummary.scss";
</style>