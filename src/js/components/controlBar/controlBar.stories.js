import { storiesOf } from '@storybook/vue'

import ControlBar from './ControlBar.vue'
import IconButton from './../inputs/buttons/iconButton/IconButton.vue'

import Icons from './../../icons'

storiesOf('Control Bar', module)
  .add('No Content', () => ({
    components: { ControlBar, IconButton },
    template: ` 
    <control-bar>
    </control-bar>`
  }))
  .add('With Content', () => ({
    components: { ControlBar, IconButton },
    data () {
      return {
        icons: Icons
      }
    },
    template: ` 
    <control-bar>
      <a>Text</a>
      <icon-button
        :iconName="icons.favorite"
      />
      <icon-button
        :iconName="icons.refresh"
      />
      <icon-button
        :iconName="icons.remove"
      />
    </control-bar>`
  }))
