import * as mutations from './mutations'
import * as getters from './getters'
import FormSchema from '../core/schema'

const state = {
  basicDefinition: {
    formId: 0,
    formSchema: {},
    model: {},
    formDefinition: [], // 简化后的 form 结构
    valid: true,
    messages: {},  // 校验信息
    ajv: null,
    validator: null,
    generator: new FormSchema()
  }
}

export default {
  state,
  mutations: {
    ...mutations
  },
  getters: {
    ...getters
  }
}
