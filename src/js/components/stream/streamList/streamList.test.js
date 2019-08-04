import { mount } from '@vue/test-utils'
import Streamlist from './StreamList.vue'
import { streams, options, favorites } from '../../../mockData/mockData'

describe('Streamlist', () => {
  const wrapper = mount(Streamlist, {
    propsData: {
      streams: streams,
      options: options,
      favorites: favorites,
      appHover: false
    }
  })

  const navButton = wrapper.find('.nav-toggle-button')
  const streamsElts = wrapper.findAll('.stream')

  test('streams', () => {
    expect(streamsElts.length).toBe(streams.length)
  })

  test('layoutClass', () => {
    expect(wrapper.vm.layoutClass).toBe(
      `streams--layout-${options.currentLayout.id}`
    )
  })

  test('streamLengthClass', () => {
    expect(wrapper.vm.streamLengthClass).toBe(`streams--${streams.length}`)
  })

  test('placeholder slot', () => {
    expect(wrapper.find('.placeholder').exists()).toBe(false)

    wrapper.setProps({ streams: [] })
    expect(wrapper.find('.placeholder').exists()).toBe(true)
  })
})
