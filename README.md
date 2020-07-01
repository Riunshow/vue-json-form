# 动态表单


### todolist
* 在前端工程内联调
* ~~初始化的数据绑定到 v-model~~
* 表单校验
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