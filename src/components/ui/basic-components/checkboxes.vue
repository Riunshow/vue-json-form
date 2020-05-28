<template>
  <div>
    <label class="checkbox-inline" v-for="item in definition.options" :key="item.value">
      <input class="vue-json-form-input" type="checkbox" v-model="value"
      :value="item.value"
      :true-value="item.value"
      :disabled="definition.disabled"
      :name="name"
      :readonly="definition.readonly"
      :lazy="definition.lazy === false ? false : true" />
      {{ item.label }}
    </label>
  </div>
</template>

<script>
import basicMixin from '../../mixin/basic'
import _ from 'lodash'

export default {
  mixins: [basicMixin],
  computed: {
    value: {
      get () {
        return _.get(this.model, this.definition.key) || []
      },
      set (val) {
        // 无值
        if (val === '') {
          this.removeValue(this.definition.key)
        } else {
          this.setValue({ key: this.definition.key, value: val})
        }
      }
    }
  }
}
</script>
