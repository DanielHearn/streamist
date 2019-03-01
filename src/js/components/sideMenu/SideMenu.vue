<template>
  <div class="menu" :class="{visible: options.menuVisible}">
    <div class="menu-bar">
      <div class="menu-bar-content">
        <icon-button 
          v-for="menuitem in $options.menuItems" :key="menuitem.itemName"
          @click.native="loadMenu(menuitem.itemName)"
          :class="{active: currentMenu === menuitem.itemName}"
          :buttonClasses="'button--dark button--menu'"
          :iconClasses="'menu-icon'"
          :iconName="menuitem.iconName">
          <p>{{menuitem.itemName}}</p>
        </icon-button>
      </div>
    </div>
    <div class="menu-content">
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
    </div>
  </div>
</template>

<script src="./sideMenu.js"></script>

<style lang="scss">
    @import './sideMenu.scss';
</style>