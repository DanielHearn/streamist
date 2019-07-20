import { mount } from '@vue/test-utils'
import ListItem from './ListItem.vue'

describe('ListItem', () => {
  test('handleActive', () => {
    const wrapper = mount(ListItem, {
      propsData: {
        handleActive: false
      }
    })
    expect(wrapper.find('.handle').exists()).toBe(false)

    wrapper.setProps({ handleActive: true })
    expect(wrapper.find('.handle').exists()).toBe(true)
  })

  test('Slots', () => {
    const headerContent = '<p>Header</p>'
    const mainContent = '<p>Content</p>'
    const wrapper = mount(ListItem, {
      slots: {
        header: headerContent,
        content: mainContent
      }
    })
    const header = wrapper.find('.item-header')
    const content = wrapper.find('.item-content')

    expect(header.html()).toContain(headerContent)
    expect(content.html()).toContain(mainContent)
  })

  test('Hidden content slot', () => {
    const headerContent = '<p>Header</p>'
    const wrapper = mount(ListItem, {
      slots: {
        header: headerContent
      }
    })
    const header = wrapper.find('.item-header')
    const content = wrapper.find('.item-content')

    expect(header.html()).toContain(headerContent)
    expect(content.exists()).toBe(false)
  })
})
