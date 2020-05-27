<template>
  <div class='vue-form'>
    <component :is='theme'>
      <slot></slot>
    </component>
  </div>
</template>

<script>
import Horizontal from './layout/horizontal.vue'

// 生成 schema 相关方法
import GeneratorSchema from '../core/schema'

// jsonform validate
import Ajv from '../validate'

export default {
  components: {
    'bootstrap': Horizontal
  },
  props: {
		key: String,
		validator: Function,
    theme: {
      type: String,
      default: 'bootstrap'
    }
	},
  data () {
		return {
			schema: {},
			theme: 'bootstrap',
			valid: true,
			messages: {},  // 校验信息
			ajv: null,
			validator: null,
			generator: new GeneratorSchema()
		}
	},
  created: function () {
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

    this.init(schema)
  },
  methods: {
    init (schema) {
			this.schema = this.generator.parse(schema)
			this.ajv = new Ajv()
			this.validator = null
			this.messages = {}
			this.valid = true
    }
  }
}
</script>
