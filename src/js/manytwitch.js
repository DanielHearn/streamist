import Vue from 'vue'
import Vuex from 'vuex'
import Manytwitch from './components/manytwitch/manytwitch.vue'
import './../scss/main.scss'

import { storeConfig } from './store'

Vue.use(Vuex)

const store = new Vuex.Store(storeConfig)

const manytwitch = new Vue({
  el: '#manytwitch',
  store,
  render: h => h(Manytwitch)
})
