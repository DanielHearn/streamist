import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import StreamMenu from './StreamMenu.vue'
import { storeConfig } from '../../../store/store'
import { streams, favorites } from '../../../mockData'

let wrapper
let store
const localVue = createLocalVue()
localVue.use(Vuex)

beforeEach(() => {
  store = new Vuex.Store(_.cloneDeep(storeConfig))
  wrapper = mount(StreamMenu, {
    propsData: {
      streams: _.cloneDeep(streams),
      favorites: _.cloneDeep(favorites),
      smallInterface: false
    },
    store,
    localVue
  })
  store.commit('setStreams', _.cloneDeep(streams))
  store.commit('setFavorites', _.cloneDeep(favorites))
})

afterEach(() => {
  wrapper.destroy()
})

describe('StreamMenu', () => {
  test('streams', () => {
    expect(wrapper.findAll('.list-item').length).toBe(streams.length)

    wrapper.setProps({ streams: [] })

    expect(wrapper.findAll('.list-item').length).toBe(0)
  })

  test('favorited', () => {
    expect(wrapper.vm.favorited[favorites[0].streamName]).toBe(true)

    wrapper.setProps({ favorites: [] })

    expect(wrapper.vm.favorited[favorites[0].streamName]).toBe(undefined)
  })

  test('addStream', () => {
    store.commit('setStreams', [])
    expect(store.state.streams.length).toBe(0)

    wrapper.vm.addStream('twitch')
    expect(store.state.streams.length).toBe(1)
    expect(store.state.streams[0].streamName).toBe('twitch')
  })

  test('removeStream', () => {
    expect(store.state.streams.length).toBe(streams.length)
    wrapper.vm.removeStream(streams[0])

    expect(store.state.streams.length).toBe(streams.length - 1)
  })

  test('favoriteStream', () => {
    store.commit('setFavorites', [])
    wrapper.setProps({ favorites: [] })

    expect(store.state.streamFavorites.length).toBe(0)

    wrapper.vm.favoriteStream(streams[0])
    expect(store.state.streamFavorites.length).toBe(1)
  })

  test('unfavoriteStream', () => {
    store.commit('setFavorites', [streams[0]])
    wrapper.setProps({ favorites: [streams[0]] })

    expect(store.state.streamFavorites.length).toBe(1)

    wrapper.vm.unfavoriteStream(streams[0])
    expect(store.state.streamFavorites.length).toBe(0)
  })
})
