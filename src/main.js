import Vue from 'vue'
import Vuex from 'vuex'
import StreamistApp from './js/components/streamist/StreamistApp.vue'
import './scss/main.scss'

import { storeConfig } from './js/store/store.js'

Vue.use(Vuex)

const store = new Vuex.Store(storeConfig)

// eslint-disable-next-line 
const app = new Vue({
  el: '#streamist',
  store,
  render: h => h(StreamistApp)
})
