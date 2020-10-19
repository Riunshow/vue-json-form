<template>
  <div :class="['rainbower-dy-address', definition.required ? 'is-required' : '']" :style="`margin-left:-${labelWidth}`">
    <el-row v-if="mode === 'edit' && rainbowerValue.cn">
      <el-form-item :label="prefix + '所在国家或地区：'">
        <el-col :span="definition.isTranslate ? 12 : 24" class="pr10">
          <el-select v-if="mode === 'edit'" :size="size" v-model="rainbowerValue.cn.country" placeholder="请选择" @change="handleBlur">
            <el-option v-for="item in countryOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12" v-if="definition.isTranslate" class="pl10">
          <el-input :size="size" v-model="rainbowerValue.en.country" placeholder="请输入" clearable @blur="handleBlur" />
        </el-col>
      </el-form-item>
      <el-form-item :label="prefix + '所在省（州）：'">
        <el-col :span="definition.isTranslate ? 12 : 24" class="pr10">
          <el-input
            :size="size"
            v-model="rainbowerValue.cn.province"
            :disabled="rainbowerValue.cn.country === 'CN_MO' || rainbowerValue.cn.country === 'CN_HK'"
            placeholder="请输入" clearable
            @blur="handleBlur" />
        </el-col>
        <el-col :span="12" v-if="definition.isTranslate" class="pl10">
          <el-input :size="size" v-model="rainbowerValue.en.province" placeholder="请输入" clearable @blur="handleBlur" />
        </el-col>
      </el-form-item>
      <el-form-item :label="prefix + '所在市：'">
        <el-col :span="definition.isTranslate ? 12 : 24" class="pr10">
          <el-input
            :size="size"
            v-model="rainbowerValue.cn.city"
            placeholder="请输入" clearable
            :disabled="rainbowerValue.cn.country === 'CN_MO' || rainbowerValue.cn.country === 'CN_HK'"
            @blur="handleBlur" />
        </el-col>
        <el-col :span="12" v-if="definition.isTranslate" class="pl10">
          <el-input :size="size" v-model="rainbowerValue.en.city" placeholder="请输入" clearable @blur="handleBlur" />
        </el-col>
      </el-form-item>
      <el-form-item :label="prefix + '详细地址：'">
        <el-col :span="definition.isTranslate ? 12 : 24" class="pr10">
          <el-input :size="size" v-model="rainbowerValue.cn.detail" placeholder="请输入" clearable @blur="handleBlur" />
        </el-col>
        <el-col :span="12" v-if="definition.isTranslate" class="pl10">
          <el-input :size="size" v-model="rainbowerValue.en.detail" placeholder="请输入" clearable @blur="handleBlur" />
        </el-col>
      </el-form-item>
    </el-row>
    <div v-else>
      <el-form-item :label="prefix + '所在国家或地区：'">
        <el-col :span="definition.isTranslate ? 12 : 24" class="pr10">
          <span class="pr10">{{rainbowerValue.cn.country}}</span>
        </el-col>
        <el-col :span="10" v-if="definition.isTranslate" class="pl10">
          <span class="pr10">{{rainbowerValue.en.country}}</span>
        </el-col>
      </el-form-item>
      <el-form-item :label="prefix + '所在省（州）：'">
        <el-col :span="definition.isTranslate ? 12 : 24" class="pr10">
          <span class="pr10">{{rainbowerValue.cn.province}}</span>
        </el-col>
        <el-col :span="10" v-if="definition.isTranslate" class="pl10">
          <span class="pr10">{{rainbowerValue.en.province}}</span>
        </el-col>
      </el-form-item>
      <el-form-item :label="prefix + '所在市：'">
        <el-col :span="definition.isTranslate ? 12 : 24" class="pr10">
          <span class="pr10">{{rainbowerValue.cn.city}}</span>
        </el-col>
        <el-col :span="10" v-if="definition.isTranslate" class="pl10">
          <span class="pr10">{{rainbowerValue.en.city}}</span>
        </el-col>
      </el-form-item>
      <el-form-item :label="prefix + '详细地址：'">
        <el-col :span="definition.isTranslate ? 12 : 24" class="pr10">
          <span class="pr10">{{rainbowerValue.cn.detail}}</span>
        </el-col>
        <el-col :span="10" v-if="definition.isTranslate" class="pl10">
          <span class="pr10">{{rainbowerValue.en.detail}}</span>
        </el-col>
      </el-form-item>
    </div>
  </div>
</template>

<script>
import { Col, Row, Input, Select, Option, FormItem } from 'element-ui'

export default {
  components: {
    [Input.name]: Input,
    [Col.name]: Col,
    [Row.name]: Row,
    [Select.name]: Select,
    [Option.name]: Option,
    [FormItem.name]: FormItem
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
    },
    labelWidth: {
      type: String,
      default: 'auto'
    }
  },
  data () {
    return {
      rainbowerValue: {
        cn: {
          address: '',
          area: '',
          city: '',
          country: '中国大陆',
          province: ''
        },
        en: {
          address: '',
          area: '',
          city: '',
          country: 'CHINA',
          province: ''
        }
      },
      countryOptions: [
        {
          value: 'CHINA',
          label: '中国大陆'
        },
        {
          value: 'CN_MO',
          label: '中国澳门'
        },
        {
          value: 'CN_HK',
          label: '中国香港'
        },
        {
          value: 'CN_TW',
          label: '中国台湾'
        },
        {
          value: 'OTHER',
          label: '其他'
        }
      ]
    }
  },
  watch: {
    value (val, oldVal) {
      if (val !== oldVal && val.cn) {
        this.rainbowerValue = val
      }
    }
  },
  computed: {
    prefix () {
      return this.definition.prefix || ''
    }
  },
  created () {
    if (this.value.cn) {
      this.rainbowerValue = this.value
    }
  },
  methods: {
    getProvinceName (country) {
      let name = ''
      this.countryOptions.forEach(item => {
        if (item.value === country) {
          name = country === 'CHINA' ? item.label : item.label.substring(2)
        }
      })
      return name
    },
    handleBlur () {
      // 澳门香港
      if (this.value.cn.country === 'CN_MO' || this.value.cn.country === 'CN_HK') {
        this.rainbowerValue.cn.province = this.getProvinceName(this.value.cn.country)
        this.rainbowerValue.cn.city = ''
      }
      this.$emit('input', this.rainbowerValue)
    }
  }
}
</script>
<style lang="scss" scoped>
.pr10 {
  padding-right: 10px !important;
}
.pl10 {
  padding-left: 10px !important;
}
.rainbower-dy-address {
  width: 100%;
  margin-bottom: 10px;
  .el-form-item {
    margin-bottom: 10px;
  }
}
.rainbower-dy-address.is-required {
  ::v-deep .el-form-item__label:before {
    content: '*';
    color: #F56C6C;
    margin-right: 4px;
  }
}

</style>
