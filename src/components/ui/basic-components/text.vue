<template>
  <md-input-item v-model="value" placeholder="请输入" clearable />
</template>

<script>
import basicMixin from '../../mixin/basic'

import { InputItem } from 'mand-mobile'

export default {
  components: {
    [InputItem.name]: InputItem
  },
  mixins: [basicMixin]
}
</script>
