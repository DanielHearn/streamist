import { mount } from '@vue/test-utils'
import ChatItem from './ChatItem.vue'
import { streams } from './../../../mockData'

const chat = {
  streamName: 'twitch',
  index: 0
}

describe('ChatItem', () => {
  const wrapper = mount(ChatItem, {
    propsData: {
      streams: streams,
      chat: chat,
      removeAvailable: false
    }
  })

  test('Stream dropdown', () => {
    const options = wrapper.findAll('select option')

    expect(options.at(0).text()).toBe(chat.streamName)
    for (let i = 1; i < streams.length; i++) {
      expect(options.at(i).text()).toBe(streams[i].streamName)
    }
  })

  test('id', () => {
    expect(wrapper.vm.id).toBe(`embed-chat-${chat.streamName}`)
  })

  test('src', () => {
    expect(wrapper.vm.src).toBe(
      `https://www.twitch.tv/embed/${chat.streamName}/chat?parent=danielhearn.co.uk`
    )
  })

  test('filteredStreams', () => {
    expect(wrapper.vm.filteredStreams).toStrictEqual(
      streams.filter(stream => {
        return stream.streamName !== wrapper.vm.newChatName
      })
    )
  })

  test('removeAvailable', () => {
    expect(wrapper.find('button[title="Remove Chat"]').exists()).toBe(false)
    wrapper.setProps({ removeAvailable: true })

    expect(wrapper.find('button[title="Remove Chat"]').exists()).toBe(true)
  })

  test('loadChat', () => {
    const newName = 'twitchpresents'
    wrapper.setData({ newChatName: newName })
    wrapper.vm.loadChat()

    expect(wrapper.emitted()['load-chat'][0]).toStrictEqual([chat, newName])
  })

  test('removeChat', () => {
    wrapper.find('button[title="Remove Chat"]').trigger('click')

    expect(wrapper.emitted()['remove-chat'][0]).toStrictEqual([chat])
  })

  test('refresh hidden', () => {
    wrapper.find('button[title="Refresh Chat"]').trigger('click')

    expect(wrapper.vm.chatVisible).toBe(false)
  })

  test('refresh vsible', async () => {
    await new Promise(resolve => setTimeout(resolve, 20))
    expect(wrapper.vm.chatVisible).toBe(true)
  }, 50)
})
