<template>
  <li class="preset-listing">
    <input
      type="text"
      contenteditable="true"
      v-model="presetName"/>
    <div class="input-container">
      <load-button
        v-on:load="loadPreset"
        title="Load Preset">
      </load-button>
      <edit-button
        v-on:edit="toggleEditMode"
        title="Edit Preset">
      </edit-button>
      <remove-button 
        v-on:remove="deletePreset"
        title="Delete Preset">
      </remove-button>
    </div>
    <div v-if="editMode" class="preset-listing-edit">
      <input-form 
        v-on:submit="newPresetStream"
        placeholder="Stream Name"></input-form>
      <ul class="preset-stream-list">
        <draggable 
          v-model="orderedStreams" 
          @start="drag=true" 
          @end="drag=false"
          :options="{ghostClass:'ghost'}">
          <li
            class="draggable preset-stream"
            v-for="(stream, index) in orderedStreams"
            :stream="stream">
            <span class="material-icons handle text--green">drag_handle</span>
            <p> {{ stream }}</p> 
            <remove-button v-on:remove="deleteStreamFromPreset(index)" title="Remove Stream" ></remove-button>
          </li>
        </draggable>
      </ul>
    </div>
  </li>
</template>

<script src="./presetListing.js"></script>

<style lang="scss">
    @import './presetListing.scss';
</style>