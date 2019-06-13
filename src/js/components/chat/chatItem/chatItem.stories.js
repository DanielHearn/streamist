import { storiesOf } from '@storybook/vue'
import { streams } from './../../../mockData'

import ChatItem from './ChatItem.vue'

const chat = {
  streamName: 'twitch',
  index: 0
}

storiesOf('Chat Item', module).add('Normal', () => ({
  components: { ChatItem },
  data () {
    return {
      streams: streams,
      chat: chat
    }
  },
  template: `
    <chat-item
    :streams="streams"
    :chat="chat"
    :remove-available="false"
  ></chat-item>`
}))
