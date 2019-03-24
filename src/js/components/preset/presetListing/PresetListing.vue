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
    <template slot="content">
      <div class="input-container space-between">
        <icon-button
          class="button--secondary"
          v-if="!editMode"
          @click.native="toggleEditMode"
          :iconName="$options.icons.edit"
          title="Edit Preset"
        />
        <icon-button
          class="button--secondary active"
          v-else
          @click.native="toggleEditMode"
          :iconName="$options.icons.close"
          title="Close Preset Editing"
        />
        <icon-button
          class="button--tertiary"
          @click.native="deletePreset"
          :iconName="$options.icons.remove"
          :hasWarningColor="true"
          title="Delete Preset"
        />
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
            :options="{ghostClass:'ghost', removeCloneOnHide: true}"
          >
            <list-item
              v-for="(stream, index) in orderedStreams"
              class="preset-listing-item"
              :key="index"
              :itemName="stream"
              :actionName="$options.icons.remove"
              :actionNameIsIcon="true"
              :actionClass="'button--tertiary button--warning'"
              :class="{'drag--active': drag}"
              :handleActive="true"
              v-on:click="deleteStreamFromPreset(index)"
            />
          </draggable>
          <p v-else>No streams in preset</p>
        </list>
      </div>
    </template>
  </list-item>
</template>

<script src="./presetListing.js"></script>

<style lang="scss">
@import "./presetListing.scss";
</style>