import { storiesOf } from '@storybook/vue'

import Intro from './Intro.vue'

storiesOf('Standard Button', module).add('Normal', () => ({
  components: { Intro },
  template: `
      <Intro/>`
}))
