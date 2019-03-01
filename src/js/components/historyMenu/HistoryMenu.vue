<template>
  <menu-item
    :title="'Stream History'"
    :closeTitle="'Close History'"
    v-on:close-menu-item="$emit('close-menu')"
    >
    <stream-history-controls
      :stream-history="streamHistory"
      v-on:load-selected-history="$emit('load-selected-history', streamName)"
      v-on:clear-history="$emit('clear-history')"
    ></stream-history-controls>
  </menu-item>
</template>

<script src="./historyMenu.js"></script>