<template>
  <div class="md-example-child md-example-child-check md-example-child-check-3">
    <md-check-group v-model="value">
      <md-check-box v-for="(item, index) in definition.options" :key="index" :name="item.value">{{ item.label }}</md-check-box>
    </md-check-group>
  </div>
</template>

<script>
import basicMixin from '../../mixin/basic'
import _ from 'lodash'

import { CheckBox, CheckGroup } from 'mand-mobile'

export default {
  components: {
    [CheckBox.name]: CheckBox,
    [CheckGroup.name]: CheckGroup
  },
  mixins: [basicMixin]
}
</script>
