<template>
  <div id="manytwitch" :class="{'small-interface': $store.state.smallInterface}">
    <nav class="nav" :class="{'hidden': !$store.state.options.navVisible}">
      <icon-button
        :iconName="$store.state.options.menuVisible ? $options.icons.leftArrow : $options.icons.menu"
        :title="$store.state.options.menuVisible ? 'Close Menu' : 'Open Menu'"
        @click.native="toggleMenu"
      />
      <div class="nav-center">
        <h2 class="title">MT</h2>
        <input-form
          :placeholder="$store.state.smallInterface ? 'Channel' : 'Twitch channel'"
          class="channel-input"
          :buttonText="'Watch'"
          :buttonIconName="$store.state.smallInterface ? 'play' : ''"
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
          :disabled="!$store.state.streams.length"
          :iconName="$store.state.options.chatVisible && $store.state.streams.length ? $options.icons.rightArrow : $options.icons.chat"
          :buttonClasses="'button--secondary'"
          :title="$store.state.options.chatVisible ? 'Close Chat' : 'Open Chat'"
          @click.native="toggleChat"
        />
      </div>
    </nav>
    <div id="main">
      <side-menu
        :class="{'hidden': !$store.state.options.navVisible}"
        :menuItems="$options.menuItems"
      >
        <template slot-scope="{ currentMenu, closeMenu }">
          <layout-menu
            v-if="currentMenu === 'Layouts'"
            :streams="$store.state.streams"
            :current-layout="$store.state.options.currentLayout"
            v-on:close-menu="closeMenu"
          ></layout-menu>
          <favorites-menu
            v-if="currentMenu === 'Favorites'"
            :stream-favorites="$store.state.streamFavorites"
            v-on:close-menu="closeMenu"
          ></favorites-menu>
          <preset-menu
            v-if="currentMenu === 'Presets'"
            :stream-presets="$store.state.streamPresets"
            :streams="$store.state.streams"
            v-on:close-menu="closeMenu"
          ></preset-menu>
          <history-menu
            v-if="currentMenu === 'History'"
            :stream-history="$store.state.streamHistory"
            v-on:close-menu="closeMenu"
          ></history-menu>
          <help-menu v-if="currentMenu === 'Help'" v-on:close-menu="closeMenu"></help-menu>
          <about-menu v-if="currentMenu === 'About'" v-on:close-menu="closeMenu"></about-menu>
          <settings-menu v-if="currentMenu === 'Settings'" v-on:close-menu="closeMenu"></settings-menu>
        </template>
      </side-menu>
      <streams
        :streams="$store.state.streams"
        :appHover="appHover"
        v-on:toggle-nav="toggleNav"
        v-on:update-streams="updateStreams"
      >
        <section slot="placeholder" class="intro-content">
          <h1 class="intro-title">MANYTWITCH</h1>
          <h2 class="intro-subheading">Multiple Twitch Stream Viewer</h2>
          <p class="intro-text">Enter a twitch channel to start or watch one of the streams below.</p>
          <list slot="content" :layout="'grid'" class="intro-list">
            <div
              v-for="(stream, index) in homepageStreams"
              :key="index"
              @click="stream.clean_username ? addStream(stream.clean_username.toLowerCase()) : addStream(stream.user_name.toLowerCase())"
              class="intro-list-item-container"
            >
              <img
                v-if="!$store.state.smallInterface"
                class="intro-list-item-image"
                :src="stream.thumbnail || '/img/placeholderStreamThumbnail.png'"
                :alt="stream.user_name + '\'s stream thumbnail'"
              />
              <list-item class="intro-list-item">
                <template slot="header">
                  <div class="column">
                    <p>{{ stream.user_name }}</p>
                  </div>
                  <div class="column">
                    <icon-button :iconName="$options.icons.play" :buttonClasses="'button--accent'" />
                  </div>
                </template>
                <template slot="content" v-if="stream.game_name && stream.viewer_count">
                  <div class="column stream-details">
                    <span class="stream-name">{{stream.game_name}}</span>
                    <span class="viewer">{{stream.viewer_count}} Viewers</span>
                  </div>
                </template>
              </list-item>
            </div>
          </list>
        </section>
      </streams>
      <chats
        v-if="$store.state.streams.length"
        :streams="$store.state.streams"
        :chats-visible="$store.state.options.chatVisible"
      ></chats>
    </div>
  </div>
</template>

<script src="./manytwitch.js"></script>


<style lang="scss">
@import "./manytwitch.scss";
</style>