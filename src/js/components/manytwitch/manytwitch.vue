<template>
  <div id="manytwitch">
    <nav>
      <arrow-button
        v-if="options.menuVisible"
        button-title="Toggle Menu"
        direction="left"
        v-on:toggle="toggleMenu"
      />
      <menu-button
        v-else
        button-title="Toggle Menu"
        v-on:toggle="toggleMenu"
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
        <fullscreen-button/>
        <arrow-button
          v-if="options.chatVisible && currentStreams.length"
          direction="right"
          button-title="Toggle Chat"
          v-on:toggle="toggleChat"
        />
        <chat-button
          :disabled="!currentStreams.length"
          v-else
          title="Toggle Chat"
          v-on:toggle="toggleChat"
        />
      </div>
    </nav>
    <div id="main">
      <menu-container 
        :options="options"
        :stream-history="streamHistory"
        :current-streams="currentStreams"
        :stream-presets="streamPresets"
        :available-layouts="availableLayouts"
        v-on:change-layout="changeLayout"
        v-on:load-selected-history="loadSelectedHistory"
        v-on:clear-history="clearHistory"
        v-on:update-presets="updatePresets"
        v-on:load-preset="loadStreamsFromPreset">
        </menu-container>
      <streams
        :streams="currentStreams"
        :current-layout="options.currentLayout"
        :options="options"
        v-on:update-streams="updateStreams">
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