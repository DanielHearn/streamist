import { mount, createLocalVue } from '@vue/test-utils'
import { distanceInWordsStrict, isValid } from 'date-fns'
import Vuex from 'vuex'
import StreamHistoryItem from './StreamHistoryItem.vue'
import { storeConfig } from '../../../store/store'
import { history } from '../../../mockData'

let wrapper
let store
const localVue = createLocalVue()
localVue.use(Vuex)
const historyItem = history[0]

beforeEach(() => {
  store = new Vuex.Store(_.cloneDeep(storeConfig))
  wrapper = mount(StreamHistoryItem, {
    propsData: {
      history: _.cloneDeep(historyItem),
      currentDate: new Date(
        'Sat Jun 05 2010 00:00:00 GMT+0100 (British Summer Time)'
      ),
      smallInterface: false
    },
    store,
    localVue
  })
  store.commit('setHistory', _.cloneDeep([historyItem]))
})

afterEach(() => {
  wrapper.destroy()
})

describe('StreamHistoryItem', () => {
  test('history', () => {
    expect(wrapper.find('.column p').text()).toBe(historyItem.streamName)
  })

  test('currentDate', () => {
    expect(isValid(wrapper.vm.currentDate)).toBe(true)
    expect(wrapper.vm.currentDate.toISOString()).toBe(
      '2010-06-04T23:00:00.000Z'
    )
  })

  test('timeAdded', () => {
    const timeDifference = distanceInWordsStrict(
      historyItem.dateAdded,
      wrapper.vm.currentDate
    )

    expect(wrapper.vm.timeAdded).toBe(`${timeDifference} ago`)
    expect(wrapper.find('.sub-text').text()).toBe(
      `Watched: ${timeDifference} ago`
    )
  })

  test('smallInterface', () => {
    expect(wrapper.find('.button--icon').exists()).toBe(false)
    expect(wrapper.find('.button--text').exists()).toBe(true)
    wrapper.setProps({ smallInterface: true })

    expect(wrapper.find('.button--icon').exists()).toBe(true)
    expect(wrapper.find('.button--text').exists()).toBe(false)
  })
})
