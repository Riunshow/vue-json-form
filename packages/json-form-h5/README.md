# 动态表单

### todolist

* phone 等特殊的结构需要修改逻辑

___

### 组件实现
#### mand-mobile


| 组件名称 | 组件类型(type) | 开发人
| - | - |-
| 单选框 | radios | - |
| 多选框 | checkboxes | 钟灵 |
| 开关 | switch | - |
| 单选框 | radios | - |
| 单行输入框 | input | 钟灵 |
| 多行输入框 | textarea | - |
| 数字输入框 | number | - |
| 邮箱输入框 | email | - |
| 电话输入框 | phone | 钟灵 |
| 上传输入框 | upload | - |
| 日期选择器 | date-picker | - |
| 时间选择器 | time-picker | - |
| 日期时间选择器 | datetime-picker | - |
| 地区选择器 | area-picker | - |
| 动作选择器 | action-picker | - |

___

### 额外配置

* 需在引用的项目中 vue.config.js 中配置alias
```js
const path = require('path')

module.exports = {
    configureWebpack:{
        resolve: {
    		alias: {
			    'vue$': path.resolve(__dirname, './node_modules/vue/dist/vue.runtime.esm.js')
    		}
        }
    }
}
```