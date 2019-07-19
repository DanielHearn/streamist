import { mount } from '@vue/test-utils'
import DetailsSummary from './DetailsSummary.vue'

describe('DetailsSummary', () => {
  test('Toggles once clicked', () => {
    const wrapper = mount(DetailsSummary)

    const summary = wrapper.find('summary')
    summary.trigger('click')

    // Check active
    expect(wrapper.html()).toContain('<details class="details-summary active">')

    summary.trigger('click')
    // Check closed
    expect(wrapper.html()).toContain('<details class="details-summary">')
  })

  test('Slots', () => {
    const wrapper = mount(DetailsSummary, {
      scopedSlots: {
        header: '<p>Header Content</p>',
        content: '<p>Main Content</p>'
      }
    })

    const summary = wrapper.find('summary')
    const content = wrapper.find('.details-summary__content')

    expect(summary.html()).toContain(
      '<summary class="details-summary__header text-sub-heading"><p>Header Content</p></summary>'
    )
    expect(content.html()).toContain(
      '<div class="details-summary__content"><p>Main Content</p></div>'
    )
  })

  test('Header classes', () => {
    const wrapper = mount(DetailsSummary, {
      propsData: {
        headerClasses: 'custom-header-class'
      }
    })

    const summary = wrapper.find('summary')

    expect(summary.attributes('class')).toContain('custom-header-class')
  })
})
