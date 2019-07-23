import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import StreamItem from './StreamItem.vue'
import { storeConfig } from '../../../store/store'
import { streams, favorites } from '../../../mockData/mockData'

let wrapper
let store
const localVue = createLocalVue()
localVue.use(Vuex)
const streamItem = streams[0]

beforeEach(() => {
  store = new Vuex.Store(_.cloneDeep(storeConfig))
  wrapper = mount(StreamItem, {
    propsData: {
      stream: _.cloneDeep(streamItem),
      numStreams: 1,
      hover: false,
      isFirstStream: true,
      favorites: []
    },
    store,
    localVue
  })
  store.commit('setStreams', _.cloneDeep([streamItem]))
  store.commit('setFavorites', [])
})

afterEach(() => {
  wrapper.destroy()
})

describe('StreamItem', () => {
  test('streamUrl', () => {
    expect(wrapper.vm.streamUrl).toBe(
      `https://www.twitch.tv/${streamItem.streamName}`
    )
  })

  test('favorited', () => {
    expect(wrapper.vm.favorited).toBe(false)

    wrapper.setProps({ favorites: favorites })
    expect(wrapper.vm.favorited).toBe(true)
  })

  test('favoriteChannel', () => {
    expect(store.state.streamFavorites).toStrictEqual([])

    // Favorite channel
    wrapper.find('.button--favorite').trigger('click')
    expect(store.state.streamFavorites[0].streamName).toBe(
      streamItem.streamName
    )
    wrapper.setProps({ favorites: _.cloneDeep(favorites) })

    // Unfavorite channel
    wrapper.find('.button--favorite').trigger('click')
    console.log(store.state.streamFavorites)
    expect(store.state.streamFavorites).toStrictEqual([])
  })

  test('stream', () => {
    expect(wrapper.find('.stream-player').attributes('id')).toBe(
      streamItem.embedPlayerID
    )
  })

  test('hover', () => {
    expect(wrapper.find('.control-bar').attributes('class')).not.toContain(
      'active'
    )

    wrapper.setProps({ hover: true })
    expect(wrapper.find('.control-bar').attributes('class')).toContain('active')
  })

  test('numstreams', () => {
    expect(wrapper.find('.handle').exists()).toBe(false)

    wrapper.setProps({ numStreams: 2 })
    expect(wrapper.find('.handle').exists()).toBe(true)
  })
})
