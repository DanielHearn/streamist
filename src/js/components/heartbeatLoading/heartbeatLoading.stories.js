import { storiesOf } from '@storybook/vue'

import HeartbeatLoading from './HeartbeatLoading.vue'

storiesOf('Heartbeat Loading', module)
  .add('Normal', () => ({
    components: { HeartbeatLoading },
    template: `
    <heartbeat-loading/>`
  }))
  .add('Custom Color', () => ({
    components: { HeartbeatLoading },
    template: `
    <heartbeat-loading :color="'red'"/>`
  }))
  .add('Hidden', () => ({
    components: { HeartbeatLoading },
    template: `
    <div style="background: #21af89; display: flex; justify-content: center;">
     <heartbeat-loading :active="false"/>
    </div>`
  }))
  .add('In Container', () => ({
    components: { HeartbeatLoading },
    template: `
    <div style="background: #21af89; display: flex; justify-content: center;">
     <heartbeat-loading/>
    </div>`
  }))
