import { mount } from '@vue/test-utils'
import ChatList from './ChatList.vue'
import { streams } from '../../../mockData'

const chats = [
  {
    streamName: 'twitch',
    index: 0
  },
  {
    streamName: 'twitchpresents',
    index: 1
  }
]

describe('ChatList', () => {
  test('initial stream', () => {
    const wrapper = mount(ChatList, {
      propsData: {
        streams: streams,
        chatsVisible: true
      }
    })

    expect(wrapper.vm.chats.length).toBe(1)
    expect(wrapper.vm.chats[0].streamName).toBe(streams[0].streamName)
  })

  test('chatsVisible', () => {
    const wrapper = mount(ChatList, {
      propsData: {
        streams: streams,
        chatsVisible: true
      }
    })

    expect(wrapper.find('.chat-list').exists()).toBe(true)

    wrapper.setProps({ chatsVisible: false })

    expect(wrapper.find('.chat-list').exists()).toBe(false)
  })

  test('removeAvailable', () => {
    const wrapper = mount(ChatList, {
      propsData: {
        streams: streams,
        chatsVisible: true
      }
    })

    expect(wrapper.vm.removeAvailable).toBe(false)

    wrapper.vm.chats = _.cloneDeep(chats)

    expect(wrapper.vm.removeAvailable).toBe(true)
  })

  test('maxChats', () => {
    const wrapper = mount(ChatList, {
      propsData: {
        streams: streams,
        chatsVisible: true
      }
    })

    expect(wrapper.vm.maxChats).toBe(false)

    wrapper.vm.chats = _.cloneDeep(chats)

    expect(wrapper.vm.maxChats).toBe(true)
  })

  test('createChatObject', () => {
    const wrapper = mount(ChatList, {
      propsData: {
        streams: streams,
        chatsVisible: true
      }
    })
    const chatObject = wrapper.vm.createChatObject('twitchpresents')

    expect(chatObject).toStrictEqual({
      streamName: 'twitchpresents',
      index: wrapper.vm.chats.length
    })
  })

  test('addChat', () => {
    const wrapper = mount(ChatList, {
      propsData: {
        streams: streams,
        chatsVisible: true
      }
    })
    wrapper.find('.add-chat-container button').trigger('click')

    expect(wrapper.findAll('.stream-chat').length).toBe(2)
    expect(wrapper.vm.chats[1].streamName).toBe(streams[1].streamName)
  })

  test('removeChat', () => {
    const wrapper = mount(ChatList, {
      propsData: {
        streams: streams,
        chatsVisible: true
      }
    })
    wrapper.vm.chats = _.cloneDeep(chats)
    wrapper.vm.removeChat(wrapper.vm.chats[1])

    expect(wrapper.findAll('.stream-chat').length).toBe(1)
    expect(wrapper.vm.chats[0].streamName).toBe(streams[0].streamName)
  })

  test('getNewChat', () => {
    const wrapper = mount(ChatList, {
      propsData: {
        streams: streams,
        chatsVisible: true
      }
    })
    const newChat = wrapper.vm.getNewChatName('twitchpresents')
    expect(newChat).toStrictEqual({
      streamName: streams[streams.length - 1].streamName,
      index: streams.length - 1
    })
  })

  test('loadChat', () => {
    const wrapper = mount(ChatList, {
      propsData: {
        streams: streams,
        chatsVisible: true
      }
    })

    wrapper.setData({ chats: chats.slice(0, 1) })
    expect(wrapper.vm.chats).toStrictEqual([
      {
        streamName: 'twitch',
        index: 0
      }
    ])

    wrapper.vm.loadChat(wrapper.vm.chats[0], 'twitchpresents')
    expect(wrapper.vm.chats).toStrictEqual([
      {
        streamName: 'twitchpresents',
        index: 1
      }
    ])
  })

  test('filteredStreams', () => {
    const wrapper = mount(ChatList, {
      propsData: {
        streams: [
          {
            streamName: 'twitch',
            id: '7ja1htp',
            dateAdded: '2019-06-12T15:14:10.051Z',
            embedPlayerID: 'embed-player-twitch-7ja1htp'
          },
          {
            streamName: 'twitch',
            id: '8ja1hth',
            dateAdded: '2019-06-12T15:14:15.051Z',
            embedPlayerID: 'embed-player-twitch-8ja1hth'
          },
          {
            streamName: 'twitchpresents',
            id: '7ja1htd',
            dateAdded: '2019-06-12T15:16:10.051Z',
            embedPlayerID: 'embed-player-twitchpresents-7ja1htp'
          }
        ],
        chatsVisible: true
      }
    })

    expect(wrapper.vm.filteredStreams).toStrictEqual([
      {
        streamName: 'twitch',
        id: '7ja1htp',
        dateAdded: '2019-06-12T15:14:10.051Z',
        embedPlayerID: 'embed-player-twitch-7ja1htp'
      },
      {
        streamName: 'twitchpresents',
        id: '7ja1htd',
        dateAdded: '2019-06-12T15:16:10.051Z',
        embedPlayerID: 'embed-player-twitchpresents-7ja1htp'
      }
    ])
  })
})
