import { storiesOf } from '@storybook/vue'

import InputForm from './inputForm.vue'

storiesOf('Input Form', module)
  .add('Normal', () => ({
    components: { InputForm },
    template: `
    <input-form
    :placeholder="'Type here'"
    :buttonText="'Button'"
    :buttonIconName="'play'"
  ></input-form>`
  }))
  .add('Warning', () => ({
    components: { InputForm },
    template: `
    <input-form
    :placeholder="'Type here'"
    :buttonText="'Button'"
    :buttonIconName="'play'"
    :warning="true"
  ></input-form>`
  }))
