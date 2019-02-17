<template>
  <div class="menu-container" :class="{visible: options.menuVisible}">
    <div class="menu">
      <div class="menu-content">
        <icon-button 
          v-for="menuitem in $options.menuItems" :key="menuitem.itemName"
          @click.native="loadOptionCat(menuitem.itemName)"
          :class="{active: currentOptionCat === menuitem.itemName}"
          :buttonClasses="'button--dark button--menu'"
          :iconClasses="'menu-icon'"
          :iconName="menuitem.iconName">
          <p>{{menuitem.itemName}}</p>
        </icon-button>
      </div>
    </div>
    <div class="menu-options">
      <layout-options 
        v-if="currentOptionCat === 'Layouts'"
        :options="options"
        :current-streams="currentStreams"
        :available-layouts="availableLayouts"
        v-on:change-layout="changeLayout"
        v-on:close-options="closeOptions"
      ></layout-options>
      <preset-options 
        v-if="currentOptionCat === 'Presets'"
        :stream-presets="streamPresets"
        :current-streams="currentStreams"
        v-on:update-presets="updatePresets"
        v-on:load-preset="loadPreset"
        v-on:close-options="closeOptions"
      ></preset-options>
      <history-options 
        v-if="currentOptionCat === 'History'" 
        :stream-history="streamHistory" 
        v-on:load-selected-history="loadSelectedHistory"
        v-on:clear-history="clearHistory"
        v-on:close-options="closeOptions"
      ></history-options>
      <help-options
        v-if="currentOptionCat === 'Help'"
        v-on:close-options="closeOptions"
      ></help-options>
      <about
        v-if="currentOptionCat === 'About'"
        v-on:close-options="closeOptions"
      ></about>
    </div>
  </div>
</template>

<script src="./menuContainer.js"></script>

<style lang="scss">
    @import './menuContainer.scss';
</style>