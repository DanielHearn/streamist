import { storiesOf } from '@storybook/vue'
import { streams } from './../../../mockData'

import Chats from './ChatList.vue'

storiesOf('Chat List', module).add('Normal', () => ({
  components: { Chats },
  data () {
    return {
      streams: streams
    }
  },
  template: `
    <chats
    :streams="streams"
  ></chats>`
}))
