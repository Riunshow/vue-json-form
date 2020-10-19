<template>
  <div v-if="mode === 'edit'">
    <RadioGroup v-model="rainbowerValue" @change="handleChange">
      <Radio v-for="(item, index) in definition.options" :key="index" :label="item.value">{{ item.label }}</Radio>
    </RadioGroup>
  </div>
  <div v-else>{{ value }}</div>
</template>

<script>
import { Radio, RadioGroup } from 'element-ui'

export default {
  components: {
    Radio,
    RadioGroup
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
      rainbowerValue: this.definition.options.length && this.definition.options[0].value // 默认第一个选项
    }
  },
  watch: {
    value (val, oldVal) {
      this.rainbowerValue = val
    }
  },
  created () {
    this.rainbowerValue = this.value || (this.definition.options.length && this.definition.options[0].value)
  },
  methods: {
    handleChange (val) {
      this.$emit('input', val)
    }
  }
}
</script>
