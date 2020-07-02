import vueJsonForm from './components/form.vue'

import Store from './store/store'

import './vee-validate'

import 'mand-mobile/lib/mand-mobile.css'

export const VJFStore = Store

const plugin = {
  install: function (Vue, extendVue) {
    if (extendVue) {
      extendVue.store.registerModule('VJFStore', VJFStore)
    }
    Vue.component('vue-json-form', vueJsonForm)
  }
}

export default plugin
