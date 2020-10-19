<template>
  <md-field class="form-horizontal">
    <form-item v-for="(item, index) in formDefinition" :definition="item" :formId="formId" :key="`${item.key}-${index}`" @getFormData="getFormData" />
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
    }
  },
  computed: {
    ...mapGetters([
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
