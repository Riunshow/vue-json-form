<template>
  <div class='v-json-form'>
    <validation-observer ref="form">
      <component :is='theme' :formId="formId" :mode="mode" @getFormData="getFormData" />
    </validation-observer>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import { ValidationObserver } from 'vee-validate'

import Layout from './ui/mand-mobile/layout'

export default {
  components: {
    'mand-mobile': Layout,
    ValidationObserver
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    formId: {
      type: [String, Number],
      default: 0,
      required: true
    },
    // validator: Function,
    formSchema: {
      type: Object,
      default: () => { }
    },
    theme: {
      type: String,
      default: 'mand-mobile'
    },
    mode: {
      type: String,
      default: 'edit'
    }
  },
  data () {
    return {
    }
  },
  watch: {
    value: {
      handler (val) {
        const { formSchema, formId } = this
        formSchema.value = _.cloneDeep(val) // eslint-disable-line
        this.init({ formId, formSchema })
      },
      deep: true
    }
  },
  created () {
    const { formSchema, formId } = this

    this.init({ formId, formSchema })
  },
  methods: {
    ...mapMutations('H5JsonFormStore', [
      'init'
    ]),

    getFormData (val) {
      this.$emit('input', val)
    },

    async validateForm () {
      return this.$refs.form.validate()
    }
  }
}
</script>
<style lang="scss" scoped>
.v-json-form {
  width: 100%;
}
</style>
