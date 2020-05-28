<template>
  <div class='v-json-form'>
    <component :is='theme'>
      <slot></slot>
    </component>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import Layout from './ui/layout'

// 生成 schema 相关方法
import GeneratorSchema from '../core/schema'

// jsonform validate
// import Ajv from '../validate'

export default {
  components: {
    'defaultLayout': Layout
  },
  props: {
    // key: String,
    // validator: Function,
    formSchema: {
      type: Object,
      default: () => { }
    },
    model: {
      type: Object,
      default: () => { }
    },
    theme: {
      type: String,
      default: 'defaultLayout'
    }
  },
  data () {
    return {
      valid: true,
      messages: {},  // 校验信息
      ajv: null,
      generator: new GeneratorSchema()
    }
  },
  created () {
    const { model } = this

    this.init({ formSchema: this.formSchema, model })
  },
  methods: {
    ...mapMutations([
      'init'
    ])
  }
}
</script>
