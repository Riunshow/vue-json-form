<template>
  <div class='v-json-form'>
    <component :is='theme' :formId="formId" @getFormData="getFormData">
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
    formId: {
      type: [String, Number],
      default: 0,
      required: true
    },
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
    }
  },
  created () {
    const { model, formSchema, formId } = this

    this.init({ formId, formSchema, model })
  },
  methods: {
    ...mapMutations([
      'init'
    ]),
    getFormData (val) {
      this.$emit('input', val)
    }
  }
}
</script>
