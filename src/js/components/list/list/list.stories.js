import { storiesOf } from '@storybook/vue'

import List from './List.vue'

storiesOf('List', module)
  .add('Normal', () => ({
    components: { List },
    template: `
    <list>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
      <li>Item 4</li>
    </list>`
  }))
  .add('Row Layout', () => ({
    components: { List },
    template: `
    <list :layout="'row'">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
      <li>Item 4</li>
    </list>`
  }))
  .add('Grid Layout', () => ({
    components: { List },
    template: `
    <list :layout="'grid'">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
      <li>Item 4</li>
    </list>`
  }))
