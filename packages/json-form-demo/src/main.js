import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'

import H5JF, { H5JsonFormStore } from '@rainbower/json-form-h5'

import WebJF, { WebJsonFormStore } from '@rainbower/json-form-web'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(H5JF)
Vue.use(WebJF)

const store = new Vuex.Store({
  modules: {
    H5JsonFormStore,
    WebJsonFormStore
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
