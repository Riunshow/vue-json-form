<template>
  <div class="form-item" :class="[definition.className, name, valid.status === 1 ? 'has-success' : valid.status === 2 ? 'has-error' : '']">
    <template v-if="definition.title">
      <label class="col-sm-2 control-label">
        <span v-if="definition.required" class="required">*</span>
        {{ definition.title }}:
      </label>
      <div class="col-sm-10">
        <component :is="definition.type" :definition="definition" :key="key"></component>
      </div>
      <div class="col-sm-offset-2 col-sm-10 form-tips">
        <span v-show="valid.status">{{description}}</span>
        <span v-show="!valid.status">{{valid.message}}</span>
      </div>
    </template>
    <template v-else>
      <div class="col-sm-12">
        <component :is="definition.type" :definition="definition" :key="key"></component>
      </div>
      <div class="col-sm-12 form-tips">
        <span v-show="valid.status">{{ description }}</span>
        <span v-show="!valid.status">{{ valid.message }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import vText from './basic-components/element-ui-components/text'

const DEFAULT_VALID = {
  status: true,
  message: ''
}

export default {
  components: {
    'v-text': vText
  },
	props: {
    definition: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      default: -1
    }
	},
  computed: {
    ...mapState({
      messages: state => state.messages
    }),
    valid () {
      return _.get(this.messages, this.path.join('.')) || DEFAULT_VALID
    },
    description () {
      return this.definition.description
    },
    name () {
      return this.path.join('-')
    }
  }
}
</script>