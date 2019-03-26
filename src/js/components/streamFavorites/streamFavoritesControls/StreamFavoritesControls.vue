<template>
  <div class="stream-favorites" v-if="streamFavorites">
    <div class="menu-item-row">
      <p class="text" v-if="!favoritesAvailable">No channels in your favorites.</p>
      <list v-for="favorite in streamFavorites" :key="favorite.id">
        <list-item>
          <template slot="header">
            <div class="column">
              <p>{{ favorite.streamName }}</p>
            </div>
            <div class="column">
              <icon-button
                :iconName="$options.icons.favorited"
                :buttonClasses="'button--secondary'"
                title="Remove channel from favorites"
                @click.native="$emit('unfavorite-channel', favorite.streamName)"
              />
              <standard-button
                :buttonClasses="'button--accent button--text'"
                @click.native="loadSelectedFavorite(favorite.streamName)"
              >Watch</standard-button>
            </div>
          </template>
        </list-item>
      </list>
    </div>
    <div class="menu-item-row">
      <standard-button
        @click.native="$emit('clear-favorites')"
        :disabled="!favoritesAvailable"
        :buttonClasses="'button--secondary'"
      >Clear Favorites</standard-button>
    </div>
  </div>
</template>

<script src="./streamFavoritesControls.js"></script>

<style lang="scss">
@import "./streamFavoritesControls.scss";
</style>