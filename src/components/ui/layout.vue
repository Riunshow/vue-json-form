<template>
  <form class="form-horizontal" @submit.prevent>
    <form-item
      v-for="(item, index) in formDefinition"
      :definition="item"
      :formId="formId"
      :key="`${item.key}-${index}`"
      @getFormData="getFormData"
    />
    <slot />
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import FormItem from './form-item'

export default {
  components: {
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
