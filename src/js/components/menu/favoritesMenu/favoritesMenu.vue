<template>
  <menu-item
    :title="'Channel Favorites'"
    :closeTitle="'Close Favorites'"
    v-on:close-menu-item="$emit('close-menu')"
  >
    <div class="menu-item-row">
      <stream-favorites-controls :stream-favorites="streamFavorites"/>
    </div>
  </menu-item>
</template>

<script src="./favoritesMenu.js"></script>