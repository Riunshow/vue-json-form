import _ from 'lodash'
import extend from 'extend'

export const init = (state, { formId, formSchema, model = {} }) => {
  if (state[`formDefinition${formId}`]) {
    state[`formDefinition${formId}`] = {}
  }

  const form = {
    ...state.basicDefinition,
    formId,
    formSchema
  }

  const generator = form.generator

  form.formDefinition = generator.parse(formSchema)

  const data = generator.getDefaultModel(formSchema)

  form.model = extend(true, {}, data, model)

  state[`formDefinition${formId}`] = { ...form }
}

// 校验整个表单
export const validate = (formId, state, key) => {

}

export const setModel = (state, params) => {
  const { formId, model } = params
	state[`formDefinition${formId}`].model = _.cloneDeep(model)
}

// 设置指定属性值，表单元素值修改时触发
export const setValue = (state, { formId, key, value }) => {
  if (!key || typeof value === 'undefined' || !formId) {
    throw new Error('key & value & formId is required!')
  }

  const model = _.cloneDeep(state[`formDefinition${formId}`].model)

  _.set(model, key, value)

  state[`formDefinition${formId}`].model = _.cloneDeep(model)

  validate(formId, state, key)
}

// 删除指定属性，表单元素值为空或数组删除时触发
export const removeValue = (state, { formId, key}) => {

  const model = _.cloneDeep(state[`formDefinition${formId}`].model)

  _.unset(model, key)

  state[`formDefinition${formId}`].model = _.cloneDeep(model)

  validate(formId, state, key)
}