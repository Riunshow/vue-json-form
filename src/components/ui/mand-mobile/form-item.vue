<template>
  <validation-provider :name="definition.title" :rules="definition.required ? 'required' : ''" v-slot="{ errors }">
    <cell-item :title="definition.title" :error="errors[0]">
      <component v-model="value" slot="right" :is="definition.type" :formId="formId" :definition="definition" :key="definition.key" @getFormData="getFormData" />
    </cell-item>
  </validation-provider>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'

import CellItem from './cell-item'

import vText from './basic-components/text'
import Checkboxes from './basic-components/checkboxes'

import { ValidationProvider } from 'vee-validate'

export default {
  components: {
    'v-text': vText,
    'Checkboxes': Checkboxes,
    CellItem,
    ValidationProvider
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
    }
  },
  computed: {
    ...mapGetters([
      'getMessages'
    ])
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