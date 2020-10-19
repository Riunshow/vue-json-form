import vueJsonForm from './components/form.vue'

import { store } from '@rainbower/json-form-core'

import 'element-ui/lib/theme-chalk/index.css'

export const WebJsonFormStore = store

const plugin = {
  install: function (Vue, extendVue) {
    if (extendVue) {
      extendVue.store.registerModule('WebJsonFormStore', WebJsonFormStore)
    }
    Vue.component('web-json-form', vueJsonForm)
  }
}

export default plugin
