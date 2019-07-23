import { mount } from '@vue/test-utils'
import LayoutDemo from './LayoutDemo.vue'
import { streams, options } from './../../../mockData'

let wrapper
beforeEach(() => {
  wrapper = mount(LayoutDemo, {
    propsData: {
      streams: streams,
      layout: options.currentLayout
    }
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('LayoutDemo', () => {
  test('streams', () => {
    // Check that 5 example streams are shown in the demo
    const exampleStreams = wrapper.findAll('.layout-demo-stream')
    expect(exampleStreams.length).toBe(5)
    for (let i = 0; i < exampleStreams.length; i++) {
      const element = exampleStreams.at(i)
      expect(element.text()).toBe(`${i + 1}`)
    }

    const moreStreams = streams.concat(streams)
    wrapper.setProps({ streams: moreStreams })

    const realStreams = wrapper.findAll('.layout-demo-stream')
    expect(realStreams.length).toBe(moreStreams.length)
    for (let i = 0; i < realStreams.length; i++) {
      const element = realStreams.at(i)
      expect(element.text()).toBe(`${i + 1}`)
    }
  })

  test('streamLengthClass', () => {
    expect(wrapper.find('.streams--5').exists()).toBe(true)

    const moreStreams = streams.concat(streams)
    wrapper.setProps({ streams: moreStreams })

    expect(wrapper.find(`.streams--${moreStreams.length}`).exists()).toBe(true)
  })

  test('layoutClass', () => {
    expect(wrapper.vm.layoutClass).toBe(
      `layout-demo--layout-${wrapper.vm.layout.id}`
    )

    wrapper.setProps({ layout: { id: 'test', name: 'Test' } })

    expect(wrapper.vm.layoutClass).toBe('layout-demo--layout-test')
  })

  test('layout', () => {
    expect(wrapper.find('.column p').text()).toBe(wrapper.vm.layout.name)

    wrapper.setProps({ layout: { id: 'test', name: 'Test' } })

    expect(wrapper.vm.layoutClass).toBe('layout-demo--layout-test')
  })

  test('smallInterface', () => {
    expect(wrapper.find('.column .button--icon').exists()).toBe(false)

    wrapper.setProps({ smallInterface: true })

    expect(wrapper.find('.column .button--icon').exists()).toBe(true)
  })

  test('change-layout', () => {
    wrapper.trigger('click')

    expect(wrapper.emitted()['change-layout'][0]).toStrictEqual([
      wrapper.vm.layout
    ])
  })
})
