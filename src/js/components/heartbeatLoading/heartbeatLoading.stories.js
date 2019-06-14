import { storiesOf } from '@storybook/vue'

import HeartbeatLoading from './HeartbeatLoading.vue'

storiesOf('Heartbeat Loading', module)
  .add('Normal', () => ({
    components: { HeartbeatLoading },
    template: `
    <heartbeat-loading/>`
  }))
  .add('In Container', () => ({
    components: { HeartbeatLoading },
    template: `
    <div style="background: #21af89; display: flex; justify-content: center;">
     <heartbeat-loading/>
    </div>`
  }))
