import { mount } from '@vue/test-utils'
import ItemList from './ItemList.vue'

describe('List', () => {
  test('Default layout', () => {
    const wrapper = mount(ItemList)
    expect(wrapper.attributes('class')).toContain('list--layout-column')
  })

  test('layoutClass', () => {
    const wrapper = mount(ItemList, {
      propsData: {
        layout: 'row'
      }
    })
    expect(wrapper.attributes('class')).toContain('list--layout-row')
  })

  test('Slots', () => {
    const content = '<p>Content</p>'
    const wrapper = mount(ItemList, {
      slots: {
        default: content
      }
    })
    expect(wrapper.html()).toContain(content)
  })
})
