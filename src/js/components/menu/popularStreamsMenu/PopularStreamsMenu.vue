<template>
  <menu-item
    :title="'Popular Streams'"
    :closeTitle="'Close Popular Streams'"
    v-on:close-menu-item="$emit('close-menu')"
  >
    <template slot="content">
      <div class="menu-item-row">
        <popular-streams/>
      </div>
    </template>
  </menu-item>
</template>

<script src="./popularStreamsMenu.js"></script>