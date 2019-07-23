import { mount } from '@vue/test-utils'
import StandardButton from './StandardButton.vue'

describe('StandardButton', () => {
  test('Slots', () => {
    const content = '<p>Main Content</p>'
    const wrapper = mount(StandardButton, {
      slots: {
        default: content
      }
    })

    expect(wrapper.html()).toContain(content)
  })

  test('disabled', () => {
    const wrapper = mount(StandardButton)

    expect(wrapper.attributes('disabled')).toBe(undefined)
    wrapper.setProps({ disabled: true })

    expect(wrapper.attributes('disabled')).toBe('disabled')
  })

  test('buttonClasses', () => {
    const wrapper = mount(StandardButton)

    expect(wrapper.attributes('class')).toBe('button--accent')
    wrapper.setProps({ buttonClasses: 'button--different' })

    expect(wrapper.attributes('class')).toBe('button--different')
  })
})
