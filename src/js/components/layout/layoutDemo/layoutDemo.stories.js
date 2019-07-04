import { storiesOf } from '@storybook/vue'

import { streams } from './../../../mockData'
import { config } from './../../../config'

import LayoutDemo from './LayoutDemo.vue'

storiesOf('Layout Demo', module).add('Normal', () => ({
  components: { LayoutDemo },
  data () {
    return {
      layouts: config.availableLayouts,
      streams
    }
  },
  template: ` 
    <layout-demo
    :layout="layouts[0]"
    :streams="streams"
  />`
}))
