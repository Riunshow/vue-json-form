import vueJsonForm from './components/form.vue'
import basicMixin from './components/mixin/basic'
import Store from './store/store'
import 'mand-mobile/lib/mand-mobile.css'

export const mixins = {
	basicMixin
}
export const VueJsonForm = vueJsonForm
export const store = Store


const plugin = {
	install: function (Vue) {
		Vue.component('vue-json-form', vueJsonForm)
	}
}

// Auto-install
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
