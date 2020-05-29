import _ from 'lodash'
import extend from 'extend'
import { parseErrors } from '../util'
import Ajv from '../validate'
import localize from '../validate/localize'

export const init = (state, { formId, formSchema, model = {} }) => {
  if (state[`formDefinition${formId}`]) {
    state[`formDefinition${formId}`] = {}
  }

  const form = {
    ...state.basicDefinition,
    formId,
    formSchema,
    ajv: new Ajv()
  }

  const generator = form.generator

  form.formDefinition = generator.parse(formSchema)

  const data = generator.getDefaultModal(formSchema)

  form.model = extend(true, {}, data, model)

  state[`formDefinition${formId}`] = { ...form }
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
  // if (!state.validator) {
  //   state.validator = state.ajv.compile(state.formSchema)
  // }

  // const valid = state.validator(state.model)
  // let errors
  // key = key ? key : null

  // if (!valid) {
  //   localize(state.validator.errors, state.schema)
  //   let allErrors = parseErrors(state.validator.errors)

  //   if (key) {
  //     if (allErrors[key]) {
  //       errors = {}
  //       errors[key] = allErrors[key]
  //     }
  //   } else {
  //     errors = allErrors
  //   }

  //   if (errors) {
  //     setMessages(state, errors)
  //   }
  // }

  // if (!errors && key) {
  //   errors = {}
  //   errors[key] = true
  //   setMessages(state, errors)
  // }

  // state.model = { ...state.model }
  // state.valid = valid
}

// 设置指定属性值，表单元素值修改时触发
export const setValue = (state, { formId, key, value }) => {
  if (!key || typeof value === 'undefined' || !formId) {
    throw new Error('key & value & formId is required!')
  }

  console.log(formId, state[`formDefinition${formId}`])
  

  const model = { ...state[`formDefinition${formId}`].model }

  _.set(model, key, value)

  state[`formDefinition${formId}`].model = { ...model }

  validate(state, key)
}

// 删除指定属性，表单元素值为空或数组删除时触发
export const removeValue = (state, { formId, key}) => {

  const model = { ...state[`formDefinition${formId}`].model }

  _.unset(model, key)

  state[`formDefinition${formId}`].model = { ...model }

  validate(state, key)
}

export const setModel = (state, model) => {
  state.model = _.cloneDeep(model)
}