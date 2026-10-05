import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import StreamHistoryControls from './StreamHistoryControls.vue'
import { storeConfig } from '../../../store/store'
import { history } from '../../../mockData'
import {cloneDeep} from 'lodash'

let wrapper
let store
const localVue = createLocalVue()
localVue.use(Vuex)

describe('StreamHistoryControls', () => {
  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(storeConfig))
    wrapper = mount(StreamHistoryControls, {
      propsData: {
        streamHistory: cloneDeep(history),
        smallInterface: false
      },
      store,
      localVue
    })
    store.commit('setHistory', cloneDeep([history]))
  })
  
  afterEach(() => {
    wrapper.destroy()
  })

  test.only('streamHistory', () => {
    expect(wrapper.findAll('.stream-history-item').length).toBe(history.length)
  })

  test('historyAvailable', async () => {
    expect(wrapper.findAll('.stream-history-item').length).toBe(history.length)

    await wrapper.setProps({ streamHistory: [] })
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.text').exists()).toBe(true)
    expect(wrapper.findAll('.stream-history-item').length).toBe(0)
  })

  test('orderedHistory', () => {
    // Check history ordered with the most recent first
    expect(wrapper.vm.orderedHistory[0]).toStrictEqual(
      history[history.length - 1]
    )
    expect(wrapper.vm.orderedHistory[history.length - 1]).toStrictEqual(
      history[0]
    )
  })
})
