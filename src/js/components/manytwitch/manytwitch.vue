<template>
  <div id="manytwitch" :class="{'small-interface': smallInterface}">
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
          class="channel-input"
          :buttonText="'Watch'"
          :buttonIconName="smallInterface ? 'play' : ''"
          v-on:submit="addStream"
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
          :title="options.chatVisible ? 'Close Chat' : 'Open Chat'"
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
            :small-interface="smallInterface"
            v-on:change-layout="changeLayout"
            v-on:close-menu="closeMenu"
          ></layout-menu>
          <favorites-menu
            v-if="currentMenu === 'Favorites'"
            :stream-favorites="streamFavorites"
            :small-interface="smallInterface"
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
            :small-interface="smallInterface"
            v-on:update-presets="updatePresets"
            v-on:load-preset="loadStreamsFromPreset"
            v-on:close-menu="closeMenu"
          ></preset-menu>
          <history-menu
            v-if="currentMenu === 'History'"
            :stream-history="streamHistory"
            :small-interface="smallInterface"
            v-on:load-selected-history="loadSelectedHistory"
            v-on:clear-history="clearHistory"
            v-on:close-menu="closeMenu"
          ></history-menu>
          <help-menu v-if="currentMenu === 'Help'" v-on:close-menu="closeMenu"></help-menu>
          <about-menu v-if="currentMenu === 'About'" v-on:close-menu="closeMenu"></about-menu>
          <settings-menu
            v-if="currentMenu === 'Settings'"
            v-on:close-menu="closeMenu"
            v-on:clear-data="clearData"
          ></settings-menu>
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
      >
        <intro slot="placeholder">
          <list slot="content" :layout="'grid'" class="intro-list">
            <div
              v-for="(stream, index) in homepageStreams.slice(0, 5)"
              :key="index"
              @click="addStream(stream.user_name.toLowerCase())"
              class="intro-list-item-container"
            >
              <div v-if="!smallInterface && stream.thumbnail" class="intro-list-item-image">
                <img :src="stream.thumbnail" alt>
              </div>
              <list-item class="intro-list-item">
                <template slot="header">
                  <div class="column">
                    <p>{{ stream.user_name }}</p>
                  </div>
                  <div class="column">
                    <icon-button :iconName="$options.icons.play" :buttonClasses="'button--accent'"/>
                  </div>
                </template>
                <template slot="content" v-if="stream.game_name && stream.viewer_count">
                  <div class="column stream-details">
                    <span>{{stream.game_name}}</span>
                    <span class="viewer">{{stream.viewer_count}} Viewers</span>
                  </div>
                </template>
              </list-item>
            </div>
          </list>
        </intro>
      </streams>
      <chats :streams="streams" :options="options"></chats>
    </div>
  </div>
</template>

<script src="./manytwitch.js"></script>


<style lang="scss">
@import "./manytwitch.scss";
</style>