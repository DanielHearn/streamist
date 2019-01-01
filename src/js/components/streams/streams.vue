Vue.component('streams', {
  props: ['streams', 'options'],
  data: function () {
    return {
      orderedStreams: this.streams.slice(),
      drag: false
    }
  },
  watch: {
    'streams': function () {
      console.log('update orderedstreams from streams')
      if (this.orderedStreams !== this.streams) {
        this.orderedStreams = this.streams.slice()
      }
      console.log(this.streams)
      console.log(this.orderedStreams)
    },
    'orderedStreams': function () {
      console.log('Ordered Streams:', this.orderedStreams)
      this.$emit('update-streams', this.orderedStreams)
    }
  },
  template: `<div class="streams-container">
              <draggable 
                v-if="streams.length"
                class="streams"
                v-model="orderedStreams" 
                @start="drag=true" 
                @end="drag=false"
                :options="{ghostClass:'ghost', handle:'.handle', filter:'.stream-player', forceFallback:'true', fallbackTolerance:'2'}">
                  <stream 
                    class="draggable" 
                    v-for="stream in orderedStreams"
                    :key="stream.embedPlayerID"
                    :stream="stream"
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
              </div>`,
  methods: {
    removeStream: function (removedStream) {
      // Remove stream with matching streamIndex from currentStreams
      const newStreams = this.orderedStreams.filter(stream => stream !== removedStream)
      this.$emit('update-streams', newStreams)
    }
  },
  mounted: function () {
  }
})