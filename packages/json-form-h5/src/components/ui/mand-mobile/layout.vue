<template>
  <md-field class="pps-form-field">
    <form-item v-for="(item, index) in formDefinition" :definition="item" :formId="formId" :mode="mode" :key="`${item.key}-${index}`" @getFormData="getFormData" />
  </md-field>
</template>

<script>
import { mapGetters } from 'vuex'
import { Field } from 'mand-mobile'
import FormItem from './form-item'

export default {
  components: {
    [Field.name]: Field,
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
    }
  },
  computed: {
    ...mapGetters('H5JsonFormStore', [
      'getDefinition'
    ]),
    formDefinition () {
      return this.getDefinition(this.formId)
    }
  },
  methods: {
    getFormData (val) {
      this.$emit('getFormData', val)
    }
  }
}
</script>
