import vueJsonForm from './components/form.vue'

import Store from './store/store'

import './vee-validate'

import 'mand-mobile/lib/mand-mobile.css'

export const VJFStore = Store

const plugin = {
  install: function (Vue, ppsvue) {
    if (ppsvue) {
      ppsvue.store.registerModule('VJFStore', VJFStore)
    }
    Vue.component('vue-json-form', vueJsonForm)
  }
}

// auto install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

export default plugin
