const manytwitch = new Vue({
  el: '#manytwitch',
  data: {
    newStreamName: '',
    currentStreams: [],
    options: {
      chatVisible: true
    }
  },
  methods: {
    addStream: function () {
      console.log('Add Stream')
      if (!this.newStreamName) {
        return false
      }
      const stream = this.createStreamObject(this.newStreamName)
      this.currentStreams = this.currentStreams.concat([stream])
      this.displayStream(stream)
      this.newStreamName = ''
    },
    createStreamObject: function (streamName) {
      const stream = {}
      stream.streamName = this.newStreamName
      stream.embedPlayerID = `embed-player-${stream.streamName}`
      stream.embedChatID = `embed-chat-${stream.streamName}`
      stream.embedChatSrc = `https://www.twitch.tv/embed/${stream.streamName}/chat`
      stream.index = this.currentStreams.length
      return stream
    },
    displayStream: function (stream) {
      setTimeout(function () {
        // Create new twitch player from stream info
        new Twitch.Embed(stream.embedPlayerID, {
          width: 854,
          height: 480,
          channel: stream.streamName,
          layout: 'video'
        })
      }, 200)
    },
    removeStream: function (streamIndex) {
      // Remove stream with matching streamIndex from currentStreams
      this.currentStreams = this.currentStreams.filter(stream => stream.index !== streamIndex)
    }
  },
  created: function () {
    console.log('Manytwitch Created')
  }
})
