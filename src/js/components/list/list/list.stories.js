import { storiesOf } from '@storybook/vue'

import ItemList from './ItemList.vue'

storiesOf('List', module)
  .add('Normal', () => ({
    components: { ItemList },
    template: `
    <item-list>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
      <li>Item 4</li>
    </item-list>`
  }))
  .add('Row Layout', () => ({
    components: { ItemList },
    template: `
    <item-list :layout="'row'">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
      <li>Item 4</li>
    </item-list>`
  }))
  .add('Grid Layout', () => ({
    components: { ItemList },
    template: `
    <item-list :layout="'grid'">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
      <li>Item 4</li>
    </item-list>`
  }))
