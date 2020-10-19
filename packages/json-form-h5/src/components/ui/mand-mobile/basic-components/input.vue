<template>
  <div>
    <md-input-item v-if="mode === 'edit'" v-model="value" placeholder="请输入" clearable />
    <span v-else>{{ value }}</span>
  </div>
</template>

<script>
import basicMixin from '../../../mixin/basic'

import { InputItem } from 'mand-mobile'

export default {
  components: {
    [InputItem.name]: InputItem
  },
  mixins: [basicMixin]
}
</script>
