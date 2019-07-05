import { storiesOf } from '@storybook/vue'

import MenuItem from './MenuItem.vue'

storiesOf('Menu Item', module).add('Normal', () => ({
  components: { MenuItem },
  template: `
  <menu-item
  :title="'Menu Item Title'"
  :closeTitle="'Close Title'"
>
  <template slot="actions">
    <div class="menu-item-row">
      <p>Actions Slot</p>
    </div>
  </template>

  <template slot="content">
    <div class="menu-item-row">
      <p>Content Slot</p>
    </div>
  </template>
</menu-item>`
}))
