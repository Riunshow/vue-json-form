import Vue from 'vue'
import _ from 'lodash'
import extend from 'extend'

export const init = (state, { formId, formSchema }) => {
  if (state[`formDefinition${formId}`]) {
    state[`formDefinition${formId}`] = {}
  } else {
    Vue.set(state, `formDefinition${formId}`, {})
  }

  const form = {
    ...state.basicDefinition,
    formId,
    formSchema
  }

  const generator = form.generator

  form.formDefinition = generator.parse(formSchema)

  const data = generator.getDefaultModel(formSchema)

  form.model = extend(true, {}, data)

  state[`formDefinition${formId}`] = { ...form }
}

export const setModel = (state, params) => {
  const { formId, model } = params
  state[`formDefinition${formId}`].model = _.cloneDeep(model)
}

// 设置指定属性值，表单元素值修改时触发
export const setValue = (state, { formId, key, value = null }) => {
  if (!key || !formId) {
    throw new Error('key & formId is required!')
  }

  const model = _.cloneDeep(state[`formDefinition${formId}`].model)

  _.set(model, key, value)

  state[`formDefinition${formId}`].model = _.cloneDeep(model)
}

// 删除指定属性，表单元素值为空或数组删除时触发
export const removeValue = (state, { formId, key }) => {
  const model = _.cloneDeep(state[`formDefinition${formId}`].model)

  _.unset(model, key)

  state[`formDefinition${formId}`].model = _.cloneDeep(model)
}
