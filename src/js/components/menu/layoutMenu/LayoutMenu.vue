<template>
  <menu-item
    :title="'Stream Layouts'"
    :closeTitle="'Close Layout Options'"
    v-on:close-menu-item="$emit('close-menu')"
  >
    <div class="menu-item-row">
      <div class="layouts-demo-container">
        <list>
          <layout-demo
            v-for="layout in availableLayouts"
            :key="layout.slug"
            :class="{'active': selectedLayout.id === layout.id}"
            :layout="layout"
            :streams="indexedStreams"
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