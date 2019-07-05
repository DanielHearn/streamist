import { storiesOf } from '@storybook/vue'

import { history } from '../../../mockData/mockData'

import StreamHistoryControls from './StreamHistoryControls.vue'

storiesOf('Stream History Controls', module).add('Normal', () => ({
  components: { StreamHistoryControls },
  data () {
    return {
      streamHistory: history
    }
  },
  template: ` 
    <stream-history-controls
    :stream-history="streamHistory"
  />`
}))
