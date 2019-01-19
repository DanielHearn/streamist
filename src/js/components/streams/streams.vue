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

<script>
import draggable from 'vuedraggable'
import Stream from './../stream/Stream.vue'

export default {
  name: 'streams',
  components: {
    draggable,
    Stream
  },
  props: ['streams', 'options'],
  data: function () {
    return {
      orderedStreams: this.streams.slice(),
      drag: false
    }
  },
  watch: {
    'orderedStreams': function () {
      this.$emit('update-streams', this.orderedStreams)
    },
    'streams': function () {
      console.log('update orderedstreams from streams')
      if (this.orderedStreams !== this.streams) {
        this.orderedStreams = this.streams
      }
    }
  },
  methods: {
    removeStream: function (removedStream) {
      // Remove stream with matching streamIndex from currentStreams
      const newStreams = this.streams.filter(stream => stream !== removedStream)
      this.$emit('update-streams', newStreams)
    }
  }
}
</script>