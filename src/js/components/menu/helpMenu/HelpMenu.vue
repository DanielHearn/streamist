<template>
  <menu-item :title="'Help'" :closeTitle="'Close Help'" v-on:close-menu-item="$emit('close-menu')">
    <div class="menu-item-row">
      <details-summary :headerClasses="'button--accent'">
        <template slot="header">Watching a Twitch channel</template>
        <template slot="content">
          <p
            class="text"
          >To watch a Twitch stream type the channel name into the input box at the top of the page and click watch.</p>
        </template>
      </details-summary>
      <details-summary :headerClasses="'button--accent'">
        <template slot="header">Reordering streams</template>
        <template slot="content">
          <p
            class="text"
          >To reorder the current Twitch streams playing hover over the stream and click and drag the stream to the new location.</p>
        </template>
      </details-summary>
      <details-summary :headerClasses="'button--accent'">
        <template slot="header">Using presets</template>
        <template slot="content">
          <p
            class="text"
          >Use the presets system on the left menu to save sets of Twitch channels that can be loaded in future Manytwitch sessions with a single click.</p>
        </template>
      </details-summary>
    </div>
  </menu-item>
</template>

<script src="./helpMenu.js"></script>

<style lang="scss">
@import "./helpMenu.scss";
</style>