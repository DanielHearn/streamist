<template>
  <list-item class="preset-listing">
    <template slot="header">
      <div class="column">
        <input
          contenteditable="true"
          type="text"
          v-model="presetName"
          :class="{'input--warning': emptyPresetName}"
        >
      </div>
      <div class="column">
        <icon-button
          v-if="smallInterface"
          :iconName="$options.icons.play"
          :buttonClasses="'button--accent'"
          @click.native="loadPreset"
        />
        <standard-button
          v-else
          :buttonClasses="'button--accent button--text'"
          :disabled="!orderedStreams.length"
          @click.native="loadPreset"
        >Watch</standard-button>
      </div>
    </template>
    <template slot="content">
      <div style="margin: 0.25em; margin-top: 0.5em;" v-if="emptyPresetName">
        <p class="text-warning">Enter a name for this preset.</p>
      </div>
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
        <p class="text-warning">No streams in preset, edit preset to add streams.</p>
      </div>
      <div v-if="editMode" class="preset-listing-edit">
        <p style="margin-bottom: 0.25em;" class="text-sub-heading">Streams</p>
        <input-form
          v-on:submit="newPresetStream"
          placeholder="Channel Name"
          :buttonText="'Add'"
          :buttonIconName="smallInterface ? 'add' : ''"
        ></input-form>
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
              :class="{'drag--active': drag}"
              :handleActive="true"
            >
              <template slot="header">
                <div class="column">
                  <p>{{ stream }}</p>
                </div>
                <div class="column">
                  <icon-button
                    :iconName="$options.icons.remove"
                    :buttonClasses="'button--tertiary button--warning'"
                    title="Remove channel from favorites"
                    @click.native="deleteStreamFromPreset(index)"
                  />
                </div>
              </template>
            </list-item>
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