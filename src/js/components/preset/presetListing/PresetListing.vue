<template>
  <list-item
    :itemName="presetName"
    :actionName="'Load'"
    :canEditTitle="true"
    v-on:click="loadPreset"
    v-on:test="nameChange"
    class="preset-listing"
  >
    <div class="input-container">
      <edit-button @click.native="toggleEditMode" title="Edit Preset"></edit-button>
      <remove-button @click.native="deletePreset" title="Delete Preset"></remove-button>
    </div>
    <div v-if="editMode" class="preset-listing-edit">
      <input-form v-on:submit="newPresetStream" placeholder="Stream Name"></input-form>
      <list>
        <draggable
          v-model="orderedStreams"
          v-if="orderedStreams.length"
          @start="drag=true"
          @end="drag=false"
          :options="{ghostClass:'ghost'}"
        >
          <list-item
            v-for="(stream, index) in orderedStreams"
            :key="index"
            :itemName="stream"
            :actionName="'delete'"
            :actionNameIsIcon="true"
            :handleActive="true"
            v-on:click="deleteStreamFromPreset(index)"
          />
        </draggable>
        <p v-else>No streams in preset</p>
      </list>
    </div>
  </list-item>
</template>

<script src="./presetListing.js"></script>

<style lang="scss">
@import "./presetListing.scss";
</style>