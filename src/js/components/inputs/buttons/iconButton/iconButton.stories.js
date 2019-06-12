import { storiesOf } from '@storybook/vue'

import IconButton from './IconButton.vue'
import Icons from './../../../../icons'

storiesOf('Icon Button', module)
  .add('Normal', () => ({
    components: { IconButton },
    template: `
      <icon-button :iconName="'${Icons.edit}'"/>`
  }))
  .add('Default icon', () => ({
    components: { IconButton },
    template: `
      <icon-button/>`
  }))
  .add('Disabled', () => ({
    components: { IconButton },
    template: `
      <icon-button :disabled="true"/>`
  }))
