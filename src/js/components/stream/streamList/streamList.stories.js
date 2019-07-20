import { storiesOf } from '@storybook/vue'

import { streams, options, favorites } from '../../../mockData/mockData'

import StreamList from './StreamList.vue'

storiesOf('Stream List', module).add('Normal', () => ({
  components: { StreamList },
  data () {
    return {
      streams,
      options,
      favorites
    }
  },
  template: ` 
    <stream-list
    :streams="streams"
    :options="options"
    :favorites="favorites"
    :appHover="false"
  >
    <section slot="placeholder">
      <p>Placeholder</p>
    </section>
  </stream-list>`
}))
