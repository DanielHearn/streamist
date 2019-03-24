<template>
  <menu-item :title="'Help'" :closeTitle="'Close Help'" v-on:close-menu-item="$emit('close-menu')">
    <div class="menu-item-row">
      <p class="text-sub-heading">Watching a Twitch channel</p>
      <p
        class="text"
      >To watch a Twitch stream type the channel name into the input box at the top of the page and click watch.</p>
      <p class="text-sub-heading">Reordering streams</p>
      <p
        class="text"
      >To reorder the current Twitch streams playing hover over the stream and click and drag the stream to the new location.</p>
      <p class="text-sub-heading">Using presets</p>
      <p
        class="text"
      >Use the presets system on the left menu to save sets of Twitch channels that can be loaded in future Manytwitch sessions with a single click.</p>
    </div>
  </menu-item>
</template>

<script src="./helpMenu.js"></script>