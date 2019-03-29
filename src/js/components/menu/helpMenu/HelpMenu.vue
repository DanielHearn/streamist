<template>
  <menu-item :title="'Help'" :closeTitle="'Close Help'" v-on:close-menu-item="$emit('close-menu')">
    <div class="menu-item-row">
      <details-summary :headerClasses="'button--accent'">
        <template slot="header">Watching Twitch channels</template>
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
          >To reorder the current streams playing hover over the stream then click and drag the handle and drag the stream to the new location.</p>
        </template>
      </details-summary>
      <details-summary :headerClasses="'button--accent'">
        <template slot="header">Using Layouts</template>
        <template slot="content">
          <p
            class="text"
          >Use the layouts tab on the left menu to change how the streams being watched will be laid out.</p>
        </template>
      </details-summary>
      <details-summary :headerClasses="'button--accent'">
        <template slot="header">Using Favorites</template>
        <template slot="content">
          <p
            class="text"
          >You can favorite a currently viewed twitch channel by hovering over the stream and clicking the heart button.</p>
          <p
            class="text"
          >Favorites can also be added from within the favorites tab on the left menu by inputing the channel and clicking the favorite button.</p>
          <p
            class="text"
          >Favorites can be managed from the favorites tab on the left menu. This include removing channels from your favorites and adding channels to your currently viewed streams.</p>
        </template>
      </details-summary>
      <details-summary :headerClasses="'button--accent'">
        <template slot="header">Using Presets</template>
        <template slot="content">
          <p
            class="text"
          >Presets can be created, played and managed from within the presets tab on the left menu.</p>
          <p>A preset can be created by typing in the name for the preset into the 'Preset Name' input (this can be edited later) and then clicking the create button.</p>
          <p>A preset can be deleted by clicking the bin button next to the edit icon.</p>
          <p>Channels can be added to an existing preset by opening the edit menu for a preset and typing in the Twitch channel name into the 'Channel Name' input and clicking the 'Add' button.</p>
          <p>Channels can be removed from a preset by opening the edit menu for a preset and clicking the bin button next the the channel name.</p>
          <p>Channels can be reordered within a preset by opening the edit menu for a preset and dragging the channels to their new position in that preset.</p>
        </template>
      </details-summary>
      <details-summary :headerClasses="'button--accent'">
        <template slot="header">Using Channel History</template>
        <template slot="content">
          <p
            class="text"
          >The last 20 viewed channels will be shown within the history tab on the left menu.</p>
          <p
            class="text"
          >Channels in the history can be viewed by clicking the 'Watch' button next to the channel's name.</p>
        </template>
      </details-summary>
      <details-summary :headerClasses="'button--accent'">
        <template slot="header">Using Chat</template>
        <template slot="content">
          <p
            class="text"
          >Twitch chat channels can be added once at least one stream is being viewed. You can then pick which chat channel to have open by using the dropdown (only the currently viewed channels will be available).</p>
          <p
            class="text"
          >Additional chat channels can be added by clicking the 'Add Chat' button. Additional chats can only be added until the number of chat channels equals the number of streams being viewed.</p>
          <p>Chats can be shown by clicking the chat button on the top right of the navigation bar.</p>
          <p>Chats can be hidden by clicking the right arrow button on the top right of the navigation bar.</p>
        </template>
      </details-summary>
    </div>
  </menu-item>
</template>

<script src="./helpMenu.js"></script>

<style lang="scss">
@import "./helpMenu.scss";
</style>