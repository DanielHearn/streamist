import { mount } from '@vue/test-utils'
import IconButton from './IconButton.vue'
import Icon from './../../../../icons'

describe('IconButton', () => {
  test('Slots', () => {
    const content = '<p>Main Content</p>'
    const wrapper = mount(IconButton, {
      slots: {
        default: content
      }
    })

    expect(wrapper.html()).toContain(content)
  })

  test('disabled', () => {
    const wrapper = mount(IconButton)

    expect(wrapper.attributes('disabled')).toBe(undefined)
    wrapper.setProps({ disabled: true })

    expect(wrapper.attributes('disabled')).toBe('disabled')
  })

  test('buttonClasses', () => {
    const wrapper = mount(IconButton)

    expect(wrapper.attributes('class')).toContain('button--accent')
    wrapper.setProps({ buttonClasses: 'button--different' })

    expect(wrapper.attributes('class')).toContain('button--different')
  })

  test('iconName', () => {
    const wrapper = mount(IconButton)

    expect(wrapper.find('i').text()).toBe('mouse')
    wrapper.setProps({ iconName: Icon.play })

    expect(wrapper.find('i').text()).toBe(Icon.play)
  })

  test('iconClasses', () => {
    const wrapper = mount(IconButton)

    expect(wrapper.find('i').attributes('class')).toBe('material-icons')
    wrapper.setProps({ iconClasses: 'icon-class' })

    expect(wrapper.find('i').attributes('class')).toBe(
      'material-icons icon-class'
    )
  })

  test('hasWarningColor', () => {
    const wrapper = mount(IconButton)

    expect(wrapper.vm.warningClass).toBe('')
    wrapper.setProps({ hasWarningColor: true })

    expect(wrapper.vm.warningClass).toBe('button--warning')
  })

  test('warningClass', () => {
    const wrapper = mount(IconButton)

    expect(wrapper.attributes('class')).not.toContain('button--warningt')
    wrapper.setProps({ hasWarningColor: true })

    expect(wrapper.attributes('class')).toContain('button--warning')
  })
})
