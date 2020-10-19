<template>
  <validation-provider :name="definition.title" :rules="required ? 'required' + (componentConfig.isSelect ? ':select' : '') : ''" v-slot="{ errors }">
    <component v-if="componentConfig.isComponent" :is="componentConfig.componentName" v-model="value" v-bind="props" mode="edit" :required="required" :error="errors[0]" />

    <rainbower-cell-item v-else :title="definition.title" :required="required" :error="errors[0]" :arrow="componentConfig.isArrow" align="left" color="dark">
      <component slot="right" :is="componentConfig.componentName" v-model="value" v-bind="props" mode="edit" />
      <div v-if="definition.description" slot="children" v-html="definition.description"></div>
    </rainbower-cell-item>
  </validation-provider>
</template>

<script>
import _ from 'lodash'
import { mapGetters, mapMutations } from 'vuex'
import { ValidationProvider } from 'vee-validate'
import CellItem from './cell-item'
import FieldsetCheckbox from './basic-components/fieldset-checkbox'
import Question from './basic-components/question'

import config from '../../config/index'
import basicMixin from '../../mixin/basic'

export default {
  components: {
    ValidationProvider,
    CellItem,
    FieldsetCheckbox,
    Question
  },

  mixins: [basicMixin],

  computed: {
    // 配置
    componentConfig () {
      return config[this.definition.type] || {}
    },

    // 组件props
    props () {
      return {
        formId: this.formId,
        mode: this.mode,
        definition: { ...this.componentConfig.getProps && this.componentConfig.getProps(this.definition) },
        ...this.componentConfig.getProps && this.componentConfig.getProps(this.definition)
      }
    },

    required () {
      return this.definition.required
    }
  },

  created () {
  },

  methods: {
  }
}
</script>
