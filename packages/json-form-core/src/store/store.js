import * as mutations from './mutations'
import * as getters from './getters'
import FormSchema from '../core/schema'

const state = {
  basicDefinition: {
    formId: 0,
    formSchema: {},
    model: {},
    formDefinition: [], // 简化后的 form 结构
    validator: null,
    generator: new FormSchema()
  }
}

export default {
  namespaced: true,
  state,
  mutations: {
    ...mutations
  },
  getters: {
    ...getters
  }
}
