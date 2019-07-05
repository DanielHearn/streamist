import { storiesOf } from '@storybook/vue'

import { history } from '../../../mockData/mockData'

import StreamHistoryItem from './StreamHistoryItem.vue'

storiesOf('Stream History Item', module).add('Normal', () => ({
  components: { StreamHistoryItem },
  data () {
    return {
      currentDate: new Date(),
      history: history[0]
    }
  },
  template: ` 
    <stream-history-item
    :history="history"
    :current-date="currentDate"
  ></stream-history-item>`
}))
