import { mount } from '@vue/test-utils'
import List from './List.vue'

describe('List', () => {
  test('Default layout', () => {
    const wrapper = mount(List)
    expect(wrapper.attributes('class')).toContain('list--layout-column')
  })

  test('layoutClass', () => {
    const wrapper = mount(List, {
      propsData: {
        layout: 'row'
      }
    })
    expect(wrapper.attributes('class')).toContain('list--layout-row')
  })

  test('Slots', () => {
    const content = '<p>Content</p>'
    const wrapper = mount(List, {
      slots: {
        default: content
      }
    })
    expect(wrapper.html()).toContain(content)
  })
})
