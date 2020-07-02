<template>
  <div class="pps-cell-item">
    <md-cell-item class="pps-cell-item-wrapper" :class="[
        error ? 'is-error' : ''
      ]" :title="title" :brief="brief" :addon="addon" :arrow="arrow" :disabled="disabled" :noBorder="noBorder" @click="onClick">
      <slot slot="default"></slot>
      <slot name="left" slot="left"></slot>
      <slot name="right" slot="right"></slot>
      <slot name="children" slot="children"></slot>
    </md-cell-item>

    <p v-if="error" class="pps-cell-item-error">{{error}}</p>
  </div>
</template>

<script>
import { CellItem } from 'mand-mobile'

export default {
  components: {
    [CellItem.name]: CellItem
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    brief: {
      type: String,
      default: ''
    },
    addon: {
      type: String,
      default: ''
    },
    arrow: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    noBorder: {
      type: Boolean,
      default: false
    },

    // 新增错误提示
    error: {
      type: String,
      default: ''
    }
  },

  methods: {
    onClick (e) {
      if (!this.disabled) {
        this.$emit('click', e)
      }
    }
  }
}
</script>

<style lang="scss">
.pps-cell-item {
  .pps-cell-item-wrapper.is-error {
    .md-cell-item-body:before {
      border-bottom: 2px solid red;
    }
  }

  .pps-cell-item-error {
    position: relative;
    margin-top: 10px;
    font-size: 12px;
    color: red;
  }
}
</style>
