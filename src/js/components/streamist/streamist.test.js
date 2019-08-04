/**
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Streamist from './Streamist.vue'
import { storeConfig } from './../../store'
import { streams } from './../../mockData'

let wrapper
let store
const localVue = createLocalVue()
localVue.use(Vuex)

beforeEach(() => {
  store = new Vuex.Store(_.cloneDeep(storeConfig))
  wrapper = mount(Streamist, {
    store,
    localVue
  })
  store.commit('setStreams', _.cloneDeep(streams))
})

afterEach(() => {
  wrapper.destroy()
})
describe('Streamist', () => {
  test('appHover', () => {
    const navButton = wrapper.find('.nav-toggle-button')
    wrapper.setData({ appHover: false })

    expect(navButton.attributes('class')).toContain('fade')

    wrapper.setData({ appHover: true })
    expect(navButton.attributes('class')).not.toContain('fade')
  })
})
**/
