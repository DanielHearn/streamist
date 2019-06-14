import { storiesOf } from '@storybook/vue'

import ListItem from './ListItem.vue'

storiesOf('List Item', module)
  .add('Normal', () => ({
    components: { ListItem },
    template: `
    <list-item>
      <template slot="header">
        <p>Header</p>
      </template>
      <template slot="content">
        <p>Content</p>
      </template>
  </list-item>`
  }))
  .add('With Handle', () => ({
    components: { ListItem },
    template: `
    <list-item :handleActive="true">
      <template slot="header">
        <p>Header</p>
      </template>
      <template slot="content">
        <p>Content</p>
      </template>
  </list-item>`
  }))
