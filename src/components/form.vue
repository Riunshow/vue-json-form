<template>
  <div class='vue-form'>
    <component :is='theme'>
      <slot></slot>
    </component>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import ElementUiLayout from './ui/layout'

// 生成 schema 相关方法
import GeneratorSchema from '../core/schema'

// jsonform validate
// import Ajv from '../validate'

export default {
  components: {
    'bootstrap': ElementUiLayout
  },
  props: {
		key: String,
    validator: Function,
    model: {
      type: Object,
      default: () => {}
    },
    theme: {
      type: String,
      default: 'bootstrap'
    }
	},
  data () {
		return {
			schema: {},
			valid: true,
			messages: {},  // 校验信息
			ajv: null,
			generator: new GeneratorSchema()
		}
	},
  created () {
    const schema = {
      'schema': {
        'inputField': {
          'type': 'string',
          'title': '受保人姓名',
        }
      },
      'form': [
        {
          'key': 'inputField',
          'type': 'input'
        }
      ],
      'value': {
				'inputField': 'xxx'
			}
    }

    const { model } = this

    this.init({ schema, model })
  },
  methods: {
    ...mapMutations([
      'init'
    ])
  }
}
</script>
