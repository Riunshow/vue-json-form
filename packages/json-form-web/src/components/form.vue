<template>
  <div class='web-json-form'>
    <component ref="jsonForm" :is='theme' :formId="formId" :mode="mode" @refreshFormData="refreshFormData" :label-width="labelWidth" :size="size" :label-position="labelPosition" />
  </div>
</template>

<script>
import _ from 'lodash'

import { mapGetters, mapMutations } from 'vuex'

import Layout from './ui/element-ui/layout'

export default {
  components: {
    'element-ui': Layout
  },
  props: {
    value: {
      type: Object,
      default: () => { }
    },
    formId: {
      type: [String, Number],
      default: 0,
      required: true
    },
    formSchema: {
      type: Object,
      default: () => { }
    },
    theme: {
      type: String,
      default: 'element-ui'
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
    }
  },
  watch: {
    value: {
      async handler (val) {
        const { formSchema, formId } = this
        formSchema.value = _.cloneDeep(val)
        this.init({ formId, formSchema })
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapGetters('WebJsonFormStore', [
      'getModel',
      'getFormDefinition'
    ])
  },
  created () {
    const { formSchema, formId } = this

    this.init({ formId, formSchema })
  },
  mounted () {
    // this.$emit('input', this.getModel(this.formId))
  },
  methods: {
    ...mapMutations('WebJsonFormStore', [
      'init'
    ]),
    refreshFormData (model) {
      this.$emit('input', model)
    },
    clearValidate () {
      this.$refs.jsonForm.clearValidateForm()
    },
    async validateForm () {
      let validStatus = false

      try {
        validStatus = await this.$refs.jsonForm.validateForm()
      } catch (error) {
        validStatus = false
      }

      return validStatus
    }
  }
}
</script>
<style lang="scss" scoped>
.web-json-form {
  // width: 100%;
}
</style>
