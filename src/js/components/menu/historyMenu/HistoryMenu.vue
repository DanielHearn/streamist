<template>
  <menu-item
    :title="'Channel History'"
    :closeTitle="'Close History'"
    v-on:close-menu-item="$emit('close-menu')"
  >
    <div class="menu-item-row">
      <stream-history-controls
        :stream-history="streamHistory"
        v-on:load-selected-history="loadSelectedHistory"
        v-on:clear-history="$emit('clear-history')"
      />
    </div>
  </menu-item>
</template>

<script src="./historyMenu.js"></script>