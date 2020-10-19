<template>
  <div v-if="mode === 'edit'">
    <el-input placeholder="请输入内容" v-model="rainbowerValue.phone" class="input-with-select" @blur="handleBlur">
      <el-select v-model="rainbowerValue.area" slot="prepend" placeholder="请选择" style="width: 90px" @change="handleChangeArea">
        <el-option v-for="(item, index) in definition.properties.area.options" :key="index" :label="item.text" :value="item.value" />
      </el-select>
    </el-input>
  </div>
  <span v-else>{{value}}</span>
</template>

<script>
import { Input, Select, Option } from 'element-ui'

export default {
  components: {
    [Input.name]: Input,
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
    }
  },
  data () {
    return {
      rainbowerValue: {
        area: '',
        phone: ''
      }
    }
  },
  watch: {
    value (val) {
      this.rainbowerValue = { ...val }
    }
  },
  created () {
    this.rainbowerValue = { ...this.value }
  },
  methods: {
    handleChangeArea () {
      this.$emit('input', this.rainbowerValue)
    },
    handleBlur () {
      this.$emit('input', this.rainbowerValue)
    }
  }
}
</script>
