<template>
  <div class="pps-phone">
    <div class="flex">
      <div class="area" @click="showSelector">
        <span>{{ selectorValue }}</span>
        <md-icon name="arrow-down" size="xs" />
      </div>
      <md-input-item v-model="ppsValue.phone" @change="changeInputPhone" placeholder="请输入" clearable />
    </div>
    <md-selector v-model="isSelectorShow" :default-value="ppsValue.area" :data="definition.properties.area.options" @choose="onSelectorChoose" />
  </div>
</template>

<script>
import basicMixin from '../../../mixin/basic'

import { Selector, InputItem, Icon } from 'mand-mobile'

export default {
  components: {
    [Selector.name]: Selector,
		[InputItem.name]: InputItem,
		[Icon.name]: Icon
  },
  mixins: [basicMixin],
  data () {
    return {
      isSelectorShow: false,
      ppsValue: {
        area: '',
        phone: ''
      },
      selectorValue: ''
    }
  },
  watch: {
    value (val) {
      this.ppsValue = { ...val }
      const area = this.definition.items.filter(item => item.key === 'area')
      this.selectorValue = area[0].titleMap[this.ppsValue.area]
    }
  },
  methods: {
    changeInputPhone () {
      this.value = { ...this.ppsValue }
    },
    showSelector () {
      this.isSelectorShow = true
    },
    onSelectorChoose ({ value, text }) {
      this.selectorValue = text
      this.ppsValue.area = value
      this.value = { ...this.ppsValue }
    }
  }
}
</script>
<style lang="scss" scoped>
.pps-phone {
  display: flex;

  .flex {
    display: flex;
    align-items: center;

    .area {
      display: flex;
			align-items: center;

			.md-icon {
				margin: 0 10px 0 5px;
			}
    }
  }
}
</style>