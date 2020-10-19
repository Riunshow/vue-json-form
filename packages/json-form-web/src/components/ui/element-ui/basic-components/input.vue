<template>
  <div>
    <el-input
      v-if="mode === 'edit'"
      v-model="rainbowerValue"
      :size="definition.size || size"
      :type="definition.textarea ? 'textarea' : 'text'"
      placeholder="请输入" clearable
      @blur="handleBlur" />
    <span v-else>{{ value }}</span>
  </div>
</template>

<script>
import { Input } from 'element-ui'

export default {
  components: {
    [Input.name]: Input
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
      rainbowerValue: '',
      size: 'small'
    }
  },
  watch: {
    value (val, oldVal) {
      if (val !== oldVal) {
        this.rainbowerValue = val
      }
    }
  },
  created () {
    this.rainbowerValue = this.value
  },
  methods: {
    handleBlur () {
      this.$emit('input', this.rainbowerValue)
    }
  }
}
</script>
