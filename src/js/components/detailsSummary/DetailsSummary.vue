<template>
  <details class="details-summary">
    <summary class="details-summary__header text-sub-heading" :class="headerClasses">
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