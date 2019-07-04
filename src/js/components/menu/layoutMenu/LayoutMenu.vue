<template>
  <menu-item
    :title="'Stream Layouts'"
    :closeTitle="'Close Layout Options'"
    v-on:close-menu-item="$emit('close-menu')"
  >
    <div class="menu-item-row" slot="content">
      <div class="layouts-demo-container">
        <list>
          <layout-demo
            v-for="layout in $options.config.availableLayouts"
            :key="layout.slug"
            :class="{'active': currentLayout.id === layout.id}"
            :small-inteface="$store.state.smallInterface"
            :layout="layout"
            :streams="streams"
            v-on:change-layout="changeLayout"
          />
        </list>
      </div>
    </div>
  </menu-item>
</template>

<script src="./layoutMenu.js"></script>

<style lang="scss">
@import "./layoutMenu.scss";
</style>