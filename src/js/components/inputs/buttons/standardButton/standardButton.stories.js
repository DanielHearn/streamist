import { storiesOf } from '@storybook/vue'

import StandardButton from './StandardButton.vue'

storiesOf('Standard Button', module)
  .add('Normal', () => ({
    components: { StandardButton },
    template: `
      <standard-button
        title="Button"
      >Button</standard-button>`
  }))
  .add('With ButtonClasses', () => ({
    components: { StandardButton },
    template: `
      <standard-button
        :buttonClasses="'button--fill button--accent'"
        title="Button"
      >Button</standard-button>`
  }))
  .add('Disabled', () => ({
    components: { StandardButton },
    template: `
      <standard-button
        :disabled="true"
        title="Button"
      >Button</standard-button>`
  }))
