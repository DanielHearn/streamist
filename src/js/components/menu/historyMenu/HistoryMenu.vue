<template>
  <menu-item
    :title="'Channel History'"
    :closeTitle="'Close History'"
    v-on:close-menu-item="$emit('close-menu')"
    >
    <div class="menu-item-row">
      <p>Your previously watched Twitch channels.</p>
      <stream-history-controls
        :stream-history="streamHistory"
        v-on:load-selected-history="loadSelectedHistory"
        v-on:clear-history="$emit('clear-history')"
      ></stream-history-controls>
    </div>
  </menu-item>
</template>

<script src="./historyMenu.js"></script>