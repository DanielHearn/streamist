import { mount } from '@vue/test-utils'
import InputForm from './InputForm.vue'
import Icons from './../../../icons'

describe('InputForm', () => {
  const placeholder = 'placeholder text'
  const buttonText = 'button text'
  const wrapper = mount(InputForm, {
    propsData: {
      placeholder: placeholder,
      buttonText: buttonText,
      buttonIconName: '',
      warning: false
    }
  })
  const input = wrapper.find('input')

  test('Submit emit', () => {
    wrapper.setData({ inputValue: 'this is some text' })
    wrapper.vm.submit()

    expect(wrapper.emitted().submit[0]).toStrictEqual(['this is some text'])
  })

  test('placeholder', () => {
    wrapper.setProps({ warning: 'true' })

    expect(input.attributes('placeholder')).toBe(placeholder)
  })

  test('warning', () => {
    wrapper.setProps({ warning: 'true' })

    expect(input.attributes('class')).toContain('input--warning')
  })

  test('buttonText', () => {
    const textButton = wrapper.find('button')
    expect(textButton.text()).toBe(buttonText)
  })

  test('buttonIconName', () => {
    wrapper.setProps({ buttonIconName: 'play', buttonText: '' })
    const iconButton = wrapper.find('button')

    expect(iconButton.attributes('class')).toContain('button--icon')
    expect(iconButton.text()).toBe(Icons.play)
  })
})
