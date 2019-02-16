<template>
  <menu-item
    :title="'Stream History'"
    :closeTitle="'Close History'"
    v-on:close-menu-item="closeOptions"
    >
    <stream-history-controls
      :stream-history="streamHistory"
      v-on:load-selected-history="loadSelectedHistory"
      v-on:clear-history="clearHistory"
    ></stream-history-controls>
  </menu-item>
</template>

<script src="./historyOptions.js"></script>