import { extend, localize } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'

// 导入vee-validate的全部校验规则
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

// 规则汉化
localize('zh_CN', zh)

// 重写规则
extend('required', {
  ...rules.required,
  message: (fieldName, { allowFalse }) => {
    let operationMap = {
      'select': '选择'
    }
    return `请${operationMap[allowFalse] || '输入'}${fieldName === '{field}' ? '' : fieldName}`
  }
})
