<template>
  <div class="streams-container">
    <draggable 
      v-if="streams.length"
      class="streams"
      v-model="orderedStreams" 
      @start="drag=true" 
      @end="drag=false"
      :options="{ghostClass:'ghost', handle:'.handle', filter:'.stream-player', forceFallback:'true', fallbackTolerance:'1', removeCloneOnHide: true}">
      <stream 
        class="draggable" 
        v-for="currStream in streams"
        :key="currStream.embedPlayerID"
        :currentStream="currStream"
        :numStreams="streams.length"
        :options="options"
        :hover="drag"
        v-on:remove-stream="removeStream"
        ></stream>
    </draggable>
    <intro v-if="!streams.length"/>
  </div>
</template>

<script src="./streams.js"></script>

<style lang="scss">
    @import './streams.scss';
</style>