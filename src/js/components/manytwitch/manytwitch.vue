<template>
  <div id="manytwitch">
    <nav class="nav" :class="{'hidden': !navVisible}">
      <icon-button
        :iconName="options.menuVisible ? $options.icons.leftArrow : $options.icons.menu"
        :title="options.menuVisible ? 'Close Menu' : 'Open Menu'"
        @click.native="toggleMenu"
      />
      <div class="nav-center">
        <h2 class="title">MT</h2>
        <input-form
          placeholder="Twitch channel"
          :buttonText="'Watch'"
          v-on:submit="addStreamFromNav"
        ></input-form>
      </div>
      <div class="nav-right">
        <icon-button
          :iconName="$options.icons.fullscreen"
          :buttonClasses="'button--secondary'"
          title="Toggle Fullscreen"
          @click.native="toggleFullscreen"
        />
        <icon-button
          :disabled="!streams.length"
          :iconName="options.chatVisible && streams.length ? $options.icons.rightArrow : $options.icons.chat"
          :buttonClasses="'button--secondary'"
          title="Open Chat"
          @click.native="toggleChat"
        />
      </div>
    </nav>
    <div id="main">
      <side-menu
        :class="{'hidden': !navVisible}"
        :options="options"
        :menuItems="$options.menuItems"
      >
        <template slot-scope="{ currentMenu, closeMenu }">
          <layout-menu
            v-if="currentMenu === 'Layouts'"
            :options="options"
            :streams="streams"
            :available-layouts="availableLayouts"
            v-on:change-layout="changeLayout"
            v-on:close-menu="closeMenu"
          ></layout-menu>
          <favorites-menu
            v-if="currentMenu === 'Favorites'"
            :stream-favorites="streamFavorites"
            v-on:load-selected-favorite="loadSelectedFavorite"
            v-on:clear-favorites="clearFavorites"
            v-on:favorite-channel="addStreamToFavorites"
            v-on:unfavorite-channel="unfavoriteStream"
            v-on:close-menu="closeMenu"
          ></favorites-menu>
          <preset-menu
            v-if="currentMenu === 'Presets'"
            :stream-presets="streamPresets"
            :streams="streams"
            v-on:update-presets="updatePresets"
            v-on:load-preset="loadStreamsFromPreset"
            v-on:close-menu="closeMenu"
          ></preset-menu>
          <history-menu
            v-if="currentMenu === 'History'"
            :stream-history="streamHistory"
            v-on:load-selected-history="loadSelectedHistory"
            v-on:clear-history="clearHistory"
            v-on:close-menu="closeMenu"
          ></history-menu>
          <help-menu v-if="currentMenu === 'Help'" v-on:close-menu="closeMenu"></help-menu>
          <about-menu v-if="currentMenu === 'About'" v-on:close-menu="closeMenu"></about-menu>
        </template>
      </side-menu>
      <streams
        :streams="streams"
        :options="options"
        :navVisible="navVisible"
        :appHover="appHover"
        :streamFavorites="streamFavorites"
        v-on:update-streams="updateStreams"
        v-on:toggle-nav="toggleNav"
        v-on:favorite-channel="addStreamToFavorites"
        v-on:unfavorite-channel="unfavoriteStream"
      ></streams>
      <chats :streams="streams" :options="options"></chats>
    </div>
  </div>
</template>

<script src="./manytwitch.js"></script>


<style lang="scss">
@import "./manytwitch.scss";
</style>