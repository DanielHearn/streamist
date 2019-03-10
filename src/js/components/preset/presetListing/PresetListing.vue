<template>
  <list-item
    :itemName="presetName"
    :actionName="'Watch'"
    :actionDisabled="!orderedStreams.length"
    :canEditTitle="true"
    v-on:click="loadPreset"
    v-on:test="nameChange"
    class="preset-listing"
  >
    <div class="input-container">
      <edit-button
        class="button--secondary"
        v-if="!editMode"
        @click.native="toggleEditMode"
        title="Edit Preset"
      ></edit-button>
      <close-button
        class="button--secondary active"
        v-else
        @click.native="toggleEditMode"
        title="Close Preset Editing"
      ></close-button>
      <remove-button class="button--secondary" @click.native="deletePreset" title="Delete Preset"></remove-button>
    </div>
    <div style="margin: 0.25em; margin-top: 0.5em;" v-if="!orderedStreams.length">
      <p class="text-warning">Edit preset to add streams</p>
    </div>
    <div v-if="editMode" class="preset-listing-edit">
      <p style="margin-bottom: 0.25em;" class="text-sub-heading">Streams</p>
      <input-form v-on:submit="newPresetStream" placeholder="Channel Name"></input-form>
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
            class="preset-listing-item"
            :key="index"
            :itemName="stream"
            :actionName="'delete'"
            :actionNameIsIcon="true"
            :actionClass="'button--secondary'"
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