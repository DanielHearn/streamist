import { mount } from '@vue/test-utils'
import ControlBar from './ControlBar.vue'

describe('ControlBar', () => {
  test('Slots', () => {
    const content = '<p>Main Content</p>'
    const wrapper = mount(ControlBar, {
      slots: {
        default: content
      }
    })

    expect(wrapper.html()).toContain(content)
  })
})
