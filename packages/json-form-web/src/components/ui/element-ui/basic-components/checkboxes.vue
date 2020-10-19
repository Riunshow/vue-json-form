<template>
  <div v-if="mode === 'edit'">
    <CheckboxGroup v-model="rainbowerValue" @change="handleChange">
      <Checkbox v-for="(item, index) in definition.options" :key="index" :label="item.value">{{ item.label }}</Checkbox>
    </CheckboxGroup>
  </div>
  <div v-else>{{ value }}</div>
</template>

<script>
import { Checkbox, CheckboxGroup } from 'element-ui'

export default {
  components: {
    Checkbox,
    CheckboxGroup
  },
  props: {
    value: {
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
  data () {
    return {
      rainbowerValue: []
    }
  },
  watch: {
    value (val, oldVal) {
      this.rainbowerValue = this.val || []
    }
  },
  created () {
    this.rainbowerValue = this.value || []
  },
  methods: {
    handleChange (val) {
      this.$emit('input', val)
    }
  }
}
</script>
