<template>
  <div id="manytwitch">
    <nav
      :class="{'hidden': !navVisible}"
    >
      <arrow-button
        v-if="options.menuVisible"
        title="Close Menu"
        :direction="'left'"
        @click.native="toggleMenu"
      />
      <menu-button
        v-else
        title="Open Menu"
        @click.native="toggleMenu"
      />
      <div 
        class="nav-center">
        <h2 class="title">MT</h2>
        <input-form 
        placeholder="Enter a stream"
        v-on:submit="addStreamFromNav"></input-form>
      </div>
      <div
        class="nav-right">
        <fullscreen-button
          title="Toggle Fullscreen"
        />
        <arrow-button
          v-if="options.chatVisible && currentStreams.length"
          :direction="'right'"
          title="Close Chat"
          @click.native="toggleChat"
        />
        <chat-button
          v-else
          :disabled="!currentStreams.length"
          title="Open Chat"
          @click.native="toggleChat"
        />
      </div>
    </nav>
    <div id="main">
      <side-menu
        :class="{'hidden': !navVisible}"
        :options="options"
        :menuItems="$options.menuItems">
        <template slot-scope="{ currentMenu, closeMenu }">
          <layout-menu 
            v-if="currentMenu === 'Layouts'"
            :options="options"
            :current-streams="currentStreams"
            :available-layouts="availableLayouts"
            v-on:change-layout="changeLayout"
            v-on:close-menu="closeMenu"
          ></layout-menu>
          <preset-menu 
            v-if="currentMenu === 'Presets'"
            :stream-presets="streamPresets"
            :current-streams="currentStreams"
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
          <help-menu
            v-if="currentMenu === 'Help'"
            v-on:close-menu="closeMenu"
          ></help-menu>
          <about
            v-if="currentMenu === 'About'"
            v-on:close-menu="closeMenu"
          ></about>
        </template>
      </side-menu>
      <streams
        :streams="currentStreams"
        :options="options"
        :navVisible="navVisible"
        :appHover="appHover"
        v-on:update-streams="updateStreams"
        v-on:toggle-nav="toggleNav">
      </streams>
      <chats
        :streams="currentStreams"
        :options="options">
      </chats>
    </div>
  </div>
</template>

<script src="./manytwitch.js"></script>


<style lang="scss">
    @import './manytwitch.scss';
</style>

<!--
          :stream-history="streamHistory"
        :current-streams="currentStreams"
        :stream-presets="streamPresets"
        :available-layouts="availableLayouts"
        v-on:change-layout="changeLayout"
        v-on:load-selected-history="loadSelectedHistory"
        v-on:clear-history="clearHistory"
        v-on:update-presets="updatePresets"
        v-on:load-preset="loadStreamsFromPreset"
        -->

        <!--
          <layout-menu 
            v-if="currentMenu === 'Layouts'"
            :options="options"
            :current-streams="currentStreams"
            :available-layouts="availableLayouts"
            v-on:change-layout="changeLayout"
            v-on:close-menu="closeMenu"
          ></layout-menu>
          <preset-menu 
            v-if="currentMenu === 'Presets'"
            :stream-presets="streamPresets"
            :current-streams="currentStreams"
            v-on:update-presets="updatePresets"
            v-on:load-preset="loadPreset"
            v-on:close-menu="closeMenu"
          ></preset-menu>
          <history-menu 
            v-if="currentMenu === 'History'" 
            :stream-history="streamHistory" 
            v-on:load-selected-history="loadSelectedHistory"
            v-on:clear-history="clearHistory"
            v-on:close-menu="closeMenu"
          ></history-menu>
          <help-menu
            v-if="currentMenu === 'Help'"
            v-on:close-menu="closeMenu"
          ></help-menu>
          <about
            v-if="currentMenu === 'About'"
            v-on:close-menu="closeMenu"
          ></about>
          -->