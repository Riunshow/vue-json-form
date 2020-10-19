import vueJsonForm from './components/form.vue'

import { store } from '@rainbower/json-form-core'

import './vee-validate'

import 'mand-mobile/lib/mand-mobile.css'
import 'vant/lib/index.css'

export const H5JsonFormStore = store

const plugin = {
  install: function (Vue, extendVue) {
    if (extendVue) {
      extendVue.store.registerModule('H5JsonFormStore', H5JsonFormStore)
    }
    Vue.component('h5-json-form', vueJsonForm)
  }
}

export default plugin
