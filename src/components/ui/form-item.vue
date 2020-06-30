<template>
  <div class="form-item" :class="[definition.className, name, valid.status === true ? 'has-success' : valid.status === false ? 'has-error' : '']">
    <!-- <template v-if="definition.title">
      <label class="col-sm-2 control-label">
        <span v-if="definition.required" class="required">*</span>
        {{ definition.title }}:
      </label>
      <div class="col-sm-10">
        <component :is="definition.type" :formId="formId" :definition="definition" :key="definition.key" @getFormData="getFormData"></component>
      </div>
      <div class="col-sm-offset-2 col-sm-10 form-tips">
        <span v-show="valid.status">{{description}}</span>
        <span v-show="!valid.status">{{valid.message}}</span>
      </div>
    </template>
    <template v-else>
      <div class="col-sm-12">
        <component :is="definition.type" :formId="formId" :definition="definition" :key="definition.key" @getFormData="getFormData"></component>
      </div>
      <div class="col-sm-12 form-tips">
        <span v-show="valid.status">{{ description }}</span>
        <span v-show="!valid.status">{{ valid.message }}</span>
      </div>
    </template> -->

    <md-field-item solid :title="definition.title">
      <component :is="definition.type" :formId="formId" :definition="definition" :key="definition.key" @getFormData="getFormData" />
    </md-field-item>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'

import { FieldItem } from 'mand-mobile'

import vText from './basic-components/text'
import Checkboxes from './basic-components/checkboxes'


const DEFAULT_VALID = {
  status: true,
  message: ''
}

export default {
  components: {
    'v-text': vText,
    'Checkboxes': Checkboxes,
    [FieldItem.name]: FieldItem,
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
    ]),
    messages () {
      this.getMessages(this.formId)
    },
    valid () {
      return _.get(this.messages, this.definition.key) || DEFAULT_VALID
    },
    description () {
      return this.definition.description
    },
    name () {
      return this.definition.key
    }
  },
  methods: {
    getFormData (val) {
      this.$emit('getFormData', val)
    }
  }
}
</script>