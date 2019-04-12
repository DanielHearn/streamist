<template>
  <menu-item
    :title="'Channel Favorites'"
    :closeTitle="'Close Favorites'"
    v-on:close-menu-item="$emit('close-menu')"
  >
    <div class="menu-item-row">
      <stream-favorites-controls
        :stream-favorites="streamFavorites"
        :small-interface="smallInterface"
        v-on:load-selected-favorite="loadSelectedFavorite"
        v-on:unfavorite-channel="unfavoriteChannel"
        v-on:favorite-channel="favoriteChannel"
        v-on:clear-favorites="$emit('clear-favorites')"
      />
    </div>
  </menu-item>
</template>

<script src="./favoritesMenu.js"></script>