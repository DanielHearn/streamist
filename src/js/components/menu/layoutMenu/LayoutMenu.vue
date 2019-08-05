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
            :small-interface="smallInterface"
            :layout="layout"
            :streams="streams"
            v-on:change-layout="changeLayout"
          />
        </list>
      </div>
      <div class="menu-item-row" style="margin-top: 1em;">
        <p class="text-heading">Chat Location</p>
        <div class="radio-container">
          <div class="radio-option">
            <label for="left">
              Left
              <input class="radio" type="radio" id="left" value="left" v-model="chatLocation" />
              <span class="input">
                <i v-if="chatLocation === 'left'" class="material-icons">{{$options.icons.apply}}</i>
                <i v-else class="material-icons"></i>
              </span>
            </label>
          </div>
          <div class="radio-option">
            <label for="right">
              Right
              <input
                class="radio"
                type="radio"
                id="right"
                value="right"
                v-model="chatLocation"
              />
              <span class="input">
                <i v-if="chatLocation === 'right'" class="material-icons">{{$options.icons.apply}}</i>
                <i v-else class="material-icons"></i>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </menu-item>
</template>

<script src="./layoutMenu.js"></script>

<style lang="scss">
@import "./layoutMenu.scss";
</style>