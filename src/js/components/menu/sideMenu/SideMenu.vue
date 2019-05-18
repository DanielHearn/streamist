<template>
  <div class="menu" :class="{visible: $store.state.options.menuVisible}">
    <div class="menu-bar">
      <div class="menu-bar-content">
        <icon-button
          v-for="menuitem in menuItems"
          :key="menuitem.itemName"
          @click.native="loadMenu(menuitem.itemName)"
          :class="{'active': currentMenu === menuitem.itemName}"
          :buttonClasses="'button--dark button--menu'"
          :iconClasses="'menu-icon'"
          :iconName="menuitem.iconName"
        >
          <p class="button--menu__text">{{menuitem.itemName}}</p>
        </icon-button>
      </div>
    </div>
    <div class="menu-content">
      <slot :currentMenu="currentMenu" :close-menu="closeMenu"></slot>
    </div>
  </div>
</template>

<script src="./sideMenu.js"></script>

<style lang="scss">
@import "./sideMenu.scss";
</style>