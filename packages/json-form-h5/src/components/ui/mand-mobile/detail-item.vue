<template>
  <div>
    <md-detail-item v-if="definition.type === 'input'" :title="definition.title">
      <div>{{value || '--'}}</div>
    </md-detail-item>

    <component v-else-if="componentConfig.isComponent" :is="componentConfig.componentName" v-model="value" mode="view" v-bind="props" />

    <md-detail-item v-else :title="definition.title">
      <component v-if="value" :is="componentConfig.componentName" v-model="value" mode="view" v-bind="props" />
      <div v-else>--</div>
    </md-detail-item>
  </div>
</template>

<script>
import config from '../../config/index'
import basicMixin from '../../mixin/basic'
import FieldsetCheckbox from './basic-components/fieldset-checkbox'
export default {
  components: {
    FieldsetCheckbox
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
    }
  }
}
</script>
