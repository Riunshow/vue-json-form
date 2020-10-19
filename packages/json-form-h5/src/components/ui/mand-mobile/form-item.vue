<template>
  <validation-provider :name="definition.title" :rules="definition.required ? 'required' : ''" v-slot="{ errors }">
    <cell-item :title="definition.title" :error="errors[0]">
      <component v-model="value" slot="right" :is="definition.type" :formId="formId" :mode="mode" :definition="definition" :key="definition.key" @getFormData="getFormData" />
    </cell-item>
  </validation-provider>
</template>

<script>
import CellItem from './cell-item'

import PPSInput from './basic-components/input'
import Checkboxes from './basic-components/checkboxes'
import PPSPhone from './basic-components/phone'
import ActionSheet from './basic-components/action-sheet'
import FieldsetCheckbox from './basic-components/fieldset-checkbox'

import { ValidationProvider } from 'vee-validate'

export default {
  components: {
    'input': PPSInput,
    'Checkboxes': Checkboxes,
    'phone': PPSPhone,
    FieldsetCheckbox,
    CellItem,
    ValidationProvider,
    ActionSheet
  },
  props: {
    formId: {
      type: [String, Number],
      default: 0,
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
      value: ''
    }
  },
  methods: {
    getFormData (val) {
      this.$emit('getFormData', val)
    }
  }
}
</script>
