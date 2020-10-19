<template>
  <md-field class="rainbower-form-field">
    <template v-for="(item, index) in formDefinition">
      <component v-if="renderable(item)" :is="componentName" :definition="item" :formId="formId" :mode="mode" :key="`${item.key}-${index}`"
        @getFormData="getFormData" />
    </template>
  </md-field>
</template>

<script>
import { mapGetters } from 'vuex'
import { Field } from 'mand-mobile'
import FormItem from './form-item'
import DetailItem from './detail-item'

export default {
  components: {
    [Field.name]: Field,
    FormItem,
    DetailItem
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
    group: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters('H5JsonFormStore', [
      'getDefinition'
    ]),

    componentName () {
      return this.mode === 'edit' ? 'form-item' : 'detail-item'
    },

    formDefinition () {
      return this.getDefinition(this.formId)
    }
  },
  methods: {
    renderable (item) {
      // dynamic form 启用 分组逻辑判断
      if (this.group.length > 0 && item.group) {
        this.group.includes(item.group)
      } else {
        return true
      }
    },
    getFormData (val) {
      this.$emit('getFormData', val)
    }
  }
}
</script>
