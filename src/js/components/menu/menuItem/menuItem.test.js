import { mount } from '@vue/test-utils'
import MenuItem from './MenuItem.vue'

describe('MenuItem', () => {
  const title = 'Menu Title'
  const actionsContent = '<p>Actions Content</p>'
  const mainContent = '<p>Main Content</p>'

  const wrapper = mount(MenuItem, {
    propsData: {
      title: 'Menu Title',
      closeTitle: 'Close title'
    },
    slots: {
      actions: actionsContent,
      content: mainContent
    }
  })

  const actions = wrapper.find('.menu-item-actions')
  const content = wrapper.find('.menu-item-content')

  test('Title', () => {
    const titleText = wrapper.find('.text-heading').text()

    expect(titleText).toBe(title)
  })

  test('Slots', () => {
    expect(actions.html()).toContain(actionsContent)
    expect(content.html()).toContain(mainContent)
  })
})
