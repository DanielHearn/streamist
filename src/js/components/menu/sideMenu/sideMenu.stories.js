import { storiesOf } from '@storybook/vue'

import sideMenu from './SideMenu.vue'
import Icons from './../../../icons'

storiesOf('Side Menu', module).add('Normal', () => ({
  components: { sideMenu },
  data () {
    return {
      menuItems: [
        {
          itemName: 'Layouts',
          iconName: Icons.layouts
        },
        {
          itemName: 'Favorites',
          iconName: Icons.favorite
        },
        {
          itemName: 'Presets',
          iconName: Icons.presets
        }
      ]
    }
  },
  template: `
  <side-menu
    :menuItems="menuItems"
  >
    <template slot-scope="{ currentMenu, closeMenu }">
      <div style="color: white;">
        <p v-if="currentMenu === 'Layouts'">Layouts</p>
        <p v-if="currentMenu === 'Favorites'">Favorites</p>
        <p v-if="currentMenu === 'Presets'">Presets</p>
      </div>
    </template>
  </side-menu>`
}))
