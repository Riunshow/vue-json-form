<template>
  <div class="rainbower-phone">
    <div class="flex">
      <div class="area" @click="showSelector">
        <span>{{ selectorValue }}</span>
        <md-icon name="arrow-down" size="xs" />
      </div>
      <md-input-item v-model="rainbowerValue.phone" @change="changeInputPhone" placeholder="请输入" clearable />
    </div>
    <md-selector v-model="isSelectorShow" :default-value="rainbowerValue.area" :data="definition.properties.area.options" @choose="onSelectorChoose" />
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
      rainbowerValue: {
        area: '',
        phone: ''
      },
      selectorValue: ''
    }
  },
  watch: {
    value (val) {
      this.rainbowerValue = { ...val }
      const area = this.definition.items.filter(item => item.key === 'area')
      this.selectorValue = area[0].titleMap[this.rainbowerValue.area]
    }
  },
  methods: {
    changeInputPhone () {
      this.value = { ...this.rainbowerValue }
    },
    showSelector () {
      this.isSelectorShow = true
    },
    onSelectorChoose ({ value, text }) {
      this.selectorValue = text
      this.rainbowerValue.area = value
      this.value = { ...this.rainbowerValue }
    }
  }
}
</script>
<style lang="scss" scoped>
.rainbower-phone {
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
