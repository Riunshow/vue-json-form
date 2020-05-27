import * as mutations from './mutations'
import * as getters from './getters'
import Generator from '../core/schema'

const state = {
  formSchema: {
    schema: {
      name: {
        title: 'Name',
        description: 'Nickname allowed',
        type: 'string'
      },
      gender: {
        title: 'Gender',
        description: 'Your gender',
        type: 'string',
        enum: ['male', 'female', 'alien']
      }
    }
  },
  model: {},
  formDefinition: [], // 简化后的 form 结构
  theme: 'bootstrap', // element-ui || mand-mobile
  valid: true,
  messages: {},  // 校验信息
  ajv: null,
  validator: null,
  generator: new Generator()
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
