import { storiesOf } from '@storybook/vue'

import { streams, options } from '../../../mockData/mockData'

import StreamList from './StreamList.vue'

storiesOf('Stream List', module).add('Normal', () => ({
  components: { StreamList },
  data () {
    return {
      streams,
      options
    }
  },
  template: ` 
    <stream-list
    :streams="streams"
    :options="options"
    :appHover="false"
  >
    <section slot="placeholder">
      <p>Placeholder</p>
    </section>
  </stream-list>`
}))
