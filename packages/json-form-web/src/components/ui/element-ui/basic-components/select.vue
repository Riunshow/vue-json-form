<template>
  <div>
    <el-select v-if="mode === 'edit'" :size="size" v-model="rainbowerValue" placeholder="请选择" @change="handleBlur">
      <el-option
        v-for="item in definition.options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <span v-else>{{ rainbowerSelectLabel }}</span>
  </div>
</template>

<script>
import { Select, Option } from 'element-ui'
export default {
  components: {
    [Select.name]: Select,
    [Option.name]: Option
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
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  data () {
    return {
      rainbowerValue: '',
      rainbowerSelectLabel: ''
    }
  },
  watch: {
    value (val, oldVal) {
      if (val !== oldVal) {
        this.rainbowerValue = val
        this.getSelectLabel()
      }
    }
  },
  created () {
    this.rainbowerValue = this.value || this.definition.default
    this.getSelectLabel()
  },
  methods: {
    handleBlur () {
      this.$emit('input', this.rainbowerValue)
      this.getSelectLabel()
    },
    getSelectLabel () {
      this.definition.options.forEach((item, index) => {
        if (item.value === this.rainbowerValue) {
          this.rainbowerSelectLabel = item.label
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
