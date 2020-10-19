<template>
  <div class="text-area">
    {{ params.title }}
    {{ params.description }}
    <md-textarea-item autosize class="example" v-model="rainbowerValue" placeholder="普通文本域" />
  </div>
</template>

<script>
import { TextareaItem } from 'mand-mobile'

export default {
  props: {
    value: {
      required: true
    },
    params: {
      type: Object,
      default: () => { }
    }
  },
  components: {
    [TextareaItem.name]: TextareaItem
  },
  data () {
    return {
      rainbowerValue: ''
    }
  },
  watch: {
    rainbowerValue (val) {
      this.$emit('input', val)
    }
  },
  created () {
    this.rainbowerValue = this.value || ''
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
