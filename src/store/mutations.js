import _ from 'lodash'
import extend from 'extend'
import { parseErrors } from '../util'
import Ajv from '../validate'
import localize from '../validate/localize'

export const init = (state, { formSchema, model = {} }) => {
  const generator = state.generator

  state.formSchema = formSchema
  state.validator = null
  state.formDefinition = generator.parse(formSchema)
  const data = generator.getDefaultModal(formSchema)
  state.model = extend(true, {}, data, model)
  state.ajv = new Ajv()
  state.messages = {}
  state.valid = true
}

// 设置表单元素校验结果
// status   true：正确，false：错误
export const setMessages = (state, messages) => {
  const map = {}

  Object.keys(messages).forEach(key => {
    const msg = messages[key]
    map[key] = msg.message ? {
      status: false,
      message: messages[key].message
    } : {
      status: true
    }
  })

  state.messages = Object.assign({}, state.messages, map)
}

// 校验整个表单
export const validate = (state, key) => {
  if (!state.validator) {
    state.validator = state.ajv.compile(state.formSchema)
  }

  const valid = state.validator(state.model)
  let errors
  key = key ? key : null

  if (!valid) {
    localize(state.validator.errors, state.schema)
    let allErrors = parseErrors(state.validator.errors)

    if (key) {
      if (allErrors[key]) {
        errors = {}
        errors[key] = allErrors[key]
      }
    } else {
      errors = allErrors
    }

    if (errors) {
      setMessages(state, errors)
    }
  }

  if (!errors && key) {
    errors = {}
    errors[key] = true
    setMessages(state, errors)
  }

  state.model = { ...state.model }
  state.valid = valid
}

// 设置指定属性值，表单元素值修改时触发
export const setValue = (state, { key, value }) => {
  if (!key || typeof value === 'undefined') {
    throw new Error('key and value is required!')
  }

  const model = { ...state.model }

  _.set(model, key, value)

  state.model = { ...model }

  validate(state, key)
}

// 删除指定属性，表单元素值为空或数组删除时触发
export const removeValue = (state, key) => {

  const model = { ...state.model }

  _.unset(model, key)

  state.model = { ...model }

  validate(state, key)
}

export const setModel = (state, model) => {
  state.model = _.cloneDeep(model)
}