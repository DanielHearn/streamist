import { storiesOf } from '@storybook/vue'

import DetailsSummary from './DetailsSummary.vue'

storiesOf('Details Summary', module)
  .add('Normal', () => ({
    components: { DetailsSummary },
    template: ` 
    <details-summary>
      <template slot="header">Header text</template>
      <template slot="content">
        <p
          class="text"
        >This is the content text.</p>
      </template>
  </details-summary>`
  }))
  .add('Multiple', () => ({
    components: { DetailsSummary },
    template: `
    <div>
      <details-summary>
        <template slot="header">Header text</template>
        <template slot="content">
          <p
            class="text"
          >This is the content text.</p>
        </template>
      </details-summary>
      <details-summary>
        <template slot="header">Header text</template>
        <template slot="content">
          <p
            class="text"
          >This is the content text.</p>
        </template>
      </details-summary>
      <details-summary>
        <template slot="header">Header text</template>
        <template slot="content">
          <p
            class="text"
          >This is the content text.</p>
        </template>
      </details-summary>
    </div>`
  }))
