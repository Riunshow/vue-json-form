# 基于jsonform的vue动态表单组件

> https://github.com/jsonform/jsonform

### how to use
> main.js
```js
import Vue from 'vue'
import Vuex from 'vuex'
import VJF, { VJFStore } from 'vue-json-form-create'

Vue.use(VJF)

new Vue({
  router,
  store: new Vuex.Store(VJFStore),
  render: h => h(App)
}).$mount('#app')
```
> demo.vue
```vue
<template>
  <vue-json-form v-model='formdata1' ref="form1" :formId='1' :formSchema='schema1' />
</template>

<script>
export default {
  data () {
		formdata1: {
      name: 'zxczxc',
      checkboxField: ['option1']
		},
		schema1: {
			schema: {
				name: {
					title: 'Default Name',
					description: 'Nickname allowed',
					type: 'string'
				},
				checkboxField: {
					type: 'array',
					title: '多选框',
					enum: ['option1', 'option2']
				}
			},
			form: [
				{
					key: 'name',
					type: 'input',
					required: true
				},
				{
					key: 'checkboxField',
					type: 'checkboxes',
					required: true,
					titleMap: {
						option1: '选项1',
						option2: '选项2'
					}
				},
        value: {
          name: '',
          checkboxField: []
        }
			]
		}
	}
}
</script>
```

### show
![avatar](https://admin-manage.oss-cn-hangzhou.aliyuncs.com/img/123.png)

### todolist
* ~~初始化的数据绑定到 v-model~~
* ~~表单校验~~
* ~~schema from  value  三者做映射关系(单选多选  enum 和 titleMap 做映射)~~
* 代码优化
* 组件实现
	* mand-mobile
		* 输入框
		* 多选框

* 需在vue.config.js中配置alias
```js
const path = require('path')

module.exports = {
	configureWebpack:{
    resolve: {
			extensions: ['.js', '.vue', '.json',".css"],
			alias: {
				'vue$': path.resolve(__dirname, './node_modules/vue/dist/vue.runtime.esm.js')
			}
    }
	}
}
```