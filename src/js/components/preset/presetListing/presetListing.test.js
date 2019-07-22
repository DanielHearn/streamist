import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import PresetListing from './PresetListing.vue'
import { storeConfig } from './../../../store'

let wrapper
let store
const localVue = createLocalVue()
localVue.use(Vuex)
const preset = {
  name: 'preset',
  streams: [
    {
      streamName: 'twitch',
      id: 'tg86295t',
      dateAdded: '2019-07-22T17:25:31.977Z'
    },
    {
      streamName: 'twitchpresents',
      id: 'u7dza4zq',
      dateAdded: '2019-07-22T17:25:34.870Z'
    }
  ],
  id: '3vrrqsg'
}

beforeEach(() => {
  store = new Vuex.Store(_.cloneDeep(storeConfig))
  wrapper = mount(PresetListing, {
    propsData: {
      preset: _.cloneDeep(preset),
      editMode: false,
      smallInterface: false
    },
    store,
    localVue
  })
  store.commit('setPresets', _.cloneDeep([preset]))
})

afterEach(() => {
  wrapper.destroy()
})

describe('PresetListing', () => {
  test('editMode', () => {
    expect(wrapper.find('.preset-listing-edit').exists()).toBe(false)

    wrapper.setProps({ editMode: true })

    expect(wrapper.find('.preset-listing-edit').exists()).toBe(true)
  })

  test('emptyPresetName', () => {
    expect(wrapper.vm.emptyPresetName).toBe(false)

    wrapper.setData({ presetName: '' })

    expect(wrapper.vm.emptyPresetName).toBe(true)
  })

  test('nameChange', () => {
    expect(wrapper.vm.presetName).toBe(preset.name)

    wrapper.vm.nameChange('preset 2')

    expect(wrapper.vm.presetName).toBe('preset 2')
  })

  test('deleteStreamFromPreset', () => {
    wrapper.setProps({ editMode: true })

    // Click stream delete button
    wrapper.find('.preset-listing-item .button--tertiary').trigger('click')
    expect(wrapper.vm.preset.streams).toStrictEqual(
      _.cloneDeep([preset.streams[1]])
    )
  })

  test('loadPreset', () => {
    expect(store.state.streams.length).toStrictEqual(0)

    // Click preset delete button
    wrapper.find('.button--accent').trigger('click')
    expect(store.state.streams.length).toStrictEqual(preset.streams.length)
  })

  test('deletePreset', () => {
    expect(store.state.streamPresets).toStrictEqual(_.cloneDeep([preset]))

    // Click preset delete button
    wrapper.find('.input-container .button--tertiary').trigger('click')
    expect(store.state.streamPresets).toStrictEqual([])
  })

  test('newPresetStream', () => {
    expect(store.state.streamPresets).toStrictEqual(_.cloneDeep([preset]))

    wrapper.vm.newPresetStream('twitch')
    expect(store.state.streamPresets[0].streams.length).toBe(
      _.cloneDeep(preset.streams).length + 1
    )
  })
})
