<template>
  <el-form ref="ELForm" :model="model" :label-width="labelWidth" :size="size" :label-position="labelPosition" align="left" :rules="mode === 'edit' ? rules : {}">
    <el-row class="form-web-row">
      <el-col v-for="(item, index) in formDefinition" :key="`${item.key}-${index}`" :span="item.span || 24">
        <FormItem :definition="item" :label-width="labelWidth" :formId="formId" :mode="mode" @refreshFormData="refreshFormData" />
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { Form, Row, Col } from 'element-ui'
import FormItem from './form-item'

export default {
  components: {
    [Form.name]: Form,
    [Row.name]: Row,
    [Col.name]: Col,
    FormItem
  },
  props: {
    formId: {
      type: [String, Number],
      default: 0,
      required: true
    },
    mode: {
      type: String,
      default: 'edit'
    },
    labelWidth: {
      type: String,
      default: 'auto'
    },
    size: {
      type: String,
      default: 'small'
    },
    labelPosition: {
      type: String,
      default: 'left'
    }
  },
  data () {
    return {
      model: {}
    }
  },
  watch: {

  },
  computed: {
    ...mapGetters('WebJsonFormStore', [
      'getDefinition',
      'getModel'
    ]),
    formDefinition () {
      return this.getDefinition(this.formId)
    },
    rules () {
      let rulesArr = {}

      this.formDefinition.forEach(item => {
        if (item.required) {
          rulesArr[item.key] = [{ type: item.fieldType, required: true, message: '该字段必填', trigger: ['change', 'blur'] }]
        }
      })

      return rulesArr
    }
  },
  created () {
    this.model = this.getModel(this.formId)
  },
  methods: {
    clearValidateForm () {
      this.$nextTick(() => {
        this.$refs['ELForm'].clearValidate()
      })
    },
    validateForm () {
      return this.$refs['ELForm'].validate()
    },
    refreshFormData (model, field) {
      this.model = { ...model }

      this.$emit('refreshFormData', model)

      this.$nextTick(() => {
        this.$refs['ELForm'].validateField(field)
      })
    }
  }
}
</script>

<style lang="scss">
.form-web-row {
  display: flex;
  flex-wrap: wrap;
}
</style>
