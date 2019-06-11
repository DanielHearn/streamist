<template>
  <menu-item
    :title="'Channel History'"
    :closeTitle="'Close History'"
    v-on:close-menu-item="$emit('close-menu')"
  >
    <template slot="actions">
      <div class="menu-item-row">
        <standard-button
          @click.native="clearHistory"
          :disabled="!historyAvailable"
          :buttonClasses="'button--secondary'"
        >Clear History</standard-button>
      </div>
    </template>
    <template slot="content">
      <div class="menu-item-row">
        <stream-history-controls :stream-history="streamHistory"/>
      </div>
    </template>
  </menu-item>
</template>

<script src="./historyMenu.js"></script>