<template>
  <div class="df-form-item">
    <el-form-item :label="label" :label-width="labelWidth" :prop="definition.key" :class="{ 'no-title': definition.noTitle }">
      <component v-model="value" :is="componentConfig.componentName" v-bind="props" :labelWidth="labelWidth"/>
    </el-form-item>
  </div>
</template>

<script>
import { FormItem } from 'element-ui'

import basicMixin from '../../mixin/basic'
import config from '../../config/index'

import Input from './basic-components/input'
import CheckBoxes from './basic-components/checkboxes'
import Radio from './basic-components/radio'
import Phone from './basic-components/phone'
import Select from './basic-components/select'
import Address from './basic-components/address'

export default {
  components: {
    [FormItem.name]: FormItem,
    'df-input': Input,
    'df-checkboxes': CheckBoxes,
    'df-phone': Phone,
    'df-select': Select,
    'df-address': Address,
    'df-radios': Radio
  },
  props: {
    formId: {
      type: [String, Number],
      default: 0,
      required: true
    },
    definition: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      default: 'edit'
    }
  },
  mixins: [basicMixin],
  computed: {
    label () {
      return this.definition.title ? `${this.definition.title}：` : ''
    },
    labelWidth () {
      return this.label ? '' : '40px'
    },
    // 配置
    componentConfig () {
      return this.config[this.definition.type] || {}
    },
    // 组件props
    props () {
      return {
        formId: this.formId,
        mode: this.mode,
        ...this.componentConfig.getProps && this.componentConfig.getProps(this.definition),
        definition: { ...this.componentConfig.getProps && this.componentConfig.getProps(this.definition) }
      }
    }
  },
  data () {
    return {
      config
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.df-form-item {
  .el-form-item {
    min-height: 40px;
    margin-bottom: 15px;
  }
  .no-title {
    .el-form-item__label-wrap {
      display: none;
    }
  }
  .el-select {
    width: 100%;
  }
}
</style>
