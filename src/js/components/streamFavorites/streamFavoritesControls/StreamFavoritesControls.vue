<template>
  <div class="stream-favorites" v-if="streamFavorites">
    <div class="menu-item-row">
      <input-form
        placeholder="Twitch channel"
        v-on:submit="addFavorite"
        :buttonText="'Favorite'"
        :buttonIconName="smallInterface ? 'favorite' : ''"
      ></input-form>
    </div>
    <div class="menu-item-row">
      <p class="text" v-if="!favoritesAvailable">No channels in your favorites.</p>
      <list>
        <list-item v-for="favorite in streamFavorites" :key="favorite.id">
          <template slot="header">
            <div class="column">
              <p>{{ favorite.streamName }}</p>
            </div>
            <div class="column">
              <icon-button
                :iconName="$options.icons.unfavorite"
                :buttonClasses="'button--secondary'"
                title="Remove channel from favorites"
                @click.native="$emit('unfavorite-channel', favorite.streamName)"
              />
              <icon-button
                v-if="smallInterface"
                :iconName="$options.icons.play"
                :buttonClasses="'button--accent'"
                @click.native="loadSelectedFavorite(favorite.streamName)"
              />
              <standard-button
                v-else
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