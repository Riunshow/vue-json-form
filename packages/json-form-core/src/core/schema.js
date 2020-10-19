import _ from 'lodash'

import defaultRule from './rules/default'
import inputRule from './rules/input'
import checkboxesRule from './rules/checkboxes'
import phoneRule from './rules/phone'

// 映射rules
const rulesMap = {
  input: inputRule,
  checkboxes: checkboxesRule,
  phone: phoneRule
}

class FormSchema {
  /**
   * 生成表单模型
   * @param {Object} formSchema
   */
  parse (formSchema) {
    const definition = []

    if (!(formSchema && formSchema.schema)) {
      throw new Error('formSchema或formSchema.schema不存在')
    }

    _.each(formSchema.form, formItem => {
      const schemaItem = formSchema.schema[formItem.key]

      if (!schemaItem) {
        throw new Error(`未查询到schema中定义的${formItem.key}`)
      }

      // 判断枚举是否对应
      if (schemaItem.enum) {
        if (schemaItem.enum.length !== Object.keys(formItem.titleMap).length) {
          throw new Error('[schema中的enum]与[form中的titleMap]的不匹配')
        }
      }

      // 走默认规则处理一遍数据
      const def = defaultRule(formItem, schemaItem)

      // 每种type对应的规则操作
      const rules = rulesMap[formItem.type]
      if (rules) {
        rules.call(this, def)
      }

      definition.push(def)
    })

    return definition
  }

  // 从 form schema 中获取 默认值 (value 字段)
  getDefaultModel (formSchema) {
    const model = {}
    _.each(formSchema.schema, (val, key) => {
      if (val.type === 'object' || val.type === 'Object') {
        model[key] = formSchema.value && formSchema.value[key] ? formSchema.value[key] : {}
      } else {
        model[key] = formSchema.value && formSchema.value[key] ? formSchema.value[key] : val.type === 'array' ? [] : ''
      }
    })

    return model
  }
}

export default FormSchema
