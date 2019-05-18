<template>
  <menu-item
    :title="'Channel History'"
    :closeTitle="'Close History'"
    v-on:close-menu-item="$emit('close-menu')"
  >
    <div class="menu-item-row">
      <stream-history-controls :stream-history="streamHistory"/>
    </div>
  </menu-item>
</template>

<script src="./historyMenu.js"></script>