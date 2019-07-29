import Vue from 'vue'
import Vuex from 'vuex'
import Streamist from './components/streamist/Streamist.vue'
import './../scss/main.scss'

import { storeConfig } from './store/store'

Vue.use(Vuex)

const store = new Vuex.Store(storeConfig)

const app = new Vue({
  el: '#streamist',
  store,
  render: h => h(Streamist)
})
