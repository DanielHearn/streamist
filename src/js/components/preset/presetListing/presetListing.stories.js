import { storiesOf } from '@storybook/vue'

import PresetListing from './PresetListing.vue'
import { preset } from './../../../mockData'

storiesOf('Preset Listing', module)
  .add('Normal', () => ({
    components: { PresetListing },
    data () {
      return {
        preset: preset
      }
    },
    template: `
  <preset-listing
  :preset="preset"
  :editMode="false"
  ></preset-listing>`
  }))
  .add('Edit Active', () => ({
    components: { PresetListing },
    data () {
      return {
        preset: preset
      }
    },
    template: `
  <preset-listing
  :preset="preset"
  :editMode="true"
  ></preset-listing>`
  }))
