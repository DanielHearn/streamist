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
    <section 
      v-if="!streams.length"
      class="intro-content">
        <h1 class="intro-title">MANYTWITCH</h1>
        <h2 class="intro-subheading">Multiple Twitch Stream Viewer</h2>
        <p class="intro-text">Enter a twitch channel to start.</p>
    </section>
  </div>
</template>

<script src="./streams.js"></script>

<style lang="scss">
.streams-container {
  display: flex;
  flex: 1 auto;
  justify-content: center;
  align-items: center;
}

.streams {
  display: flex;
  flex: 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
}
</style>