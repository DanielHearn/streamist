<template>
  <div class="streams-container">
    <draggable
      v-if="streams.length"
      class="streams"
      :class="[layoutClass, streamLengthClass, {'many-streams': streams.length >= 4}]"
      v-model="orderedStreams"
      @start="drag=true"
      @end="drag=false"
      ghostClass="ghost"
      handle=".handle"
      filter=".stream-player"
      forceFallback="true"
      fallbackTolerance="1"
      removeCloneOnHide="false"
    >
      <stream-item
        class="draggable stream"
        v-for="(stream, index) in streams"
        :key="stream.embedPlayerID"
        :stream="stream"
        :numStreams="streams.length"
        :isFirstStream="index === 0"
        :hover="drag"
        :favorites="favorites"
        :smallInterface="smallInterface"
      />
    </draggable>
    <div v-else class="placeholder">
      <slot name="placeholder"></slot>
    </div>
  </div>
</template>

<script src="./streamList.js"></script>

<style lang="scss">
@import "./streamList.scss";
</style>