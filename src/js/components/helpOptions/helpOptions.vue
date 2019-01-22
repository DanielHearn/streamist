<template>
  <div class="option">
    <div class="option-header">
      <p class="text-heading">Help</p>
      <close-button v-on:close="closeOptions" title="Close Help"></close-button>
    </div>
    <p class="text">To watch a Twitch stream type the channel name into the search box at the top of the page and click add.</p>
    <p class="text">To reorder the current Twitch streams playing hover over the stream and click and drag the drag handle to the new location.</p>
    <p class="text">Use the presets system on the menu bar to save sets of Twitch channels that can be loaded in future Manytwitch sessions with a single click.</p>
  </div>
</template>

<script src="./helpOptions.js"></script>