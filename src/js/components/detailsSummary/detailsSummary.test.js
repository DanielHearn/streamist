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
    const headerContent = '<p>Header Content</p>'
    const mainContent = '<p>Main Content</p>'
    const wrapper = mount(DetailsSummary, {
      slots: {
        header: headerContent,
        content: mainContent
      }
    })

    const summary = wrapper.find('summary')
    const content = wrapper.find('.details-summary__content')

    expect(summary.html()).toContain(headerContent)
    expect(content.html()).toContain(mainContent)
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
