import { storiesOf } from '@storybook/vue'

import { streams, favorites } from '../../../mockData'

import StreamItem from './StreamItem.vue'

const stream = streams[0]

storiesOf('Stream Item', module)
  .add('Normal', () => ({
    components: { StreamItem },
    data () {
      return {
        stream,
        favorites
      }
    },
    template: ` 
  <stream-item
  class="draggable"
  :stream="stream"
  :favorites="favorites"
  :numStreams="1"
  :isFirstStream="true"
  :hover="false"
/>`
  }))
  .add('Controls Active', () => ({
    components: { StreamItem },
    data () {
      return {
        stream,
        favorites
      }
    },
    template: ` 
  <stream-item
  class="draggable"
  :stream="stream"
  :favorites="favorites"
  :numStreams="1"
  :isFirstStream="true"
  :hover="true"
/>`
  }))
