<template>
  <div id="streamist" :class="{'small-interface': $store.state.smallInterface}">
    <nav class="nav" :class="{'hidden': !$store.state.options.navVisible}">
      <div>
        <icon-button
          :iconName="$store.state.options.menuVisible ? $options.icons.leftArrow : $options.icons.menu"
          :title="$store.state.options.menuVisible ? 'Close Menu' : 'Open Menu'"
          @click.native="toggleMenu"
        />
        <h2 class="title">Streamist</h2>
      </div>
      <div class="nav-center">
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
          v-if="!$store.state.smallInterface"
          :iconName="$options.icons.copy"
          :buttonClasses="'button--secondary button--copy'"
          title="Copy Page Link"
          @click.native="copyUrl"
        />
        <icon-button
          :iconName="$options.icons.fullscreen"
          :buttonClasses="'button--secondary'"
          title="Toggle Fullscreen"
          @click.native="toggleFullscreen"
        />
        <icon-button
          :disabled="!$store.state.streams.length"
          :iconName="$store.state.options.chatVisible && $store.state.streams.length ? $options.icons.chat_closed : $options.icons.chat"
          :buttonClasses="'button--secondary'"
          :title="$store.state.options.chatVisible ? 'Close Chat' : 'Open Chat'"
          @click.native="toggleChat"
        />
      </div>
    </nav>
    <icon-button
      :iconName="$store.state.options.navVisible ? $options.icons.upArrow : $options.icons.downArrow"
      :class="{'fade': !appHover && $store.state.streams.length, 'nav-visible': $store.state.options.navVisible}"
      :buttonClasses="'button--secondary'"
      class="nav-toggle-button"
      :title="$store.state.options.navVisible ? 'Hide Interface' : 'Show Interface'"
      @click.native="toggleNav"
    />
    <div id="main">
      <side-menu
        :class="{'hidden': !$store.state.options.navVisible, 'visible': $store.state.options.menuVisible}"
        :menuItems="$options.menuItems"
        v-on:current-menu="checkMenu"
      >
        <template slot-scope="{ currentMenu, closeMenu }">
          <stream-menu
            v-if="currentMenu === 'Streams'"
            :streams="$store.state.streams"
            :small-interface="$store.state.smallInterface"
            :favorites="$store.state.streamFavorites"
            v-on:close-menu="closeMenu"
          ></stream-menu>
          <layout-menu
            v-if="currentMenu === 'Layouts'"
            :streams="$store.state.streams"
            :current-layout="$store.state.options.currentLayout"
            :options="$store.state.options"
            :small-interface="$store.state.smallInterface"
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
            :small-interface="$store.state.smallInterface"
            v-on:close-menu="closeMenu"
          ></preset-menu>
          <popular-streams-menu
            v-if="currentMenu === 'Popular'"
            v-on:close-menu="closeMenu"
          ></popular-streams-menu>
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
      <div
        class="stream-chat-container"
        :class="[`chat--${$store.state.options.chatLocation}`, {'hidden': $store.state.smallInterface && $store.state.options.menuVisible && menuItemActive}]"
      >
        <stream-list
          :streams="$store.state.streams"
          :favorites="$store.state.streamFavorites"
          :options="$store.state.options"
        >
          <section slot="placeholder" class="intro-content">
            <div class="intro-info">
              <h1 class="intro-title">Streamist</h1>
              <h2 class="intro-subheading">Multiple Twitch Stream Viewer</h2>
              <p
                class="intro-text"
              >Click one of the popular streams below or enter a twitch channel above.</p>
            </div>
            <popular-streams/>
          </section>
        </stream-list>
        <chats
          v-if="$store.state.streams.length"
          :streams="$store.state.streams"
          :chats-visible="$store.state.options.chatVisible"
        ></chats>
      </div>
    </div>
  </div>
</template>

<script src="./streamist.js"></script>


<style lang="scss">
@import "./streamist.scss";
</style>