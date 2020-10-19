<template>
  <div class="question">
    {{ rainbowerValue }}
    <p class="title">{{ definition.title }}</p>
    <div class="select-area">
      <van-checkbox-group v-if="definition.items[0].type === 'checkboxes'" v-model="rainbowerValue[definition.items[0].key]" @change="changeChoose">
        <van-checkbox v-for="(item, index) in definition.options" :key="index" :name="item.value">{{ item.label }}</van-checkbox>
      </van-checkbox-group>
      <van-radio-group v-else v-model="rainbowerValue[definition.items[0].key]" @change="changeChoose">
        <van-radio v-for="(item, index) in definition.options" :key="index" :name="item.value">{{ item.label }}</van-radio>
      </van-radio-group>
    </div>
    <div class="other-area" v-if="isShowNext">
      <component v-for="(item, index) in componentItems" :key="index" :is="config[item.type]" v-model="rainbowerValue[item.key]" v-bind="item" />
    </div>
  </div>
</template>

<script>
import { TextareaItem, InputItem } from 'mand-mobile'
import { Checkbox, CheckboxGroup, RadioGroup, Radio } from 'vant'

export default {
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [TextareaItem.name]: TextareaItem,
    [InputItem.name]: InputItem
  },
  props: {
    value: {
      required: true
    },
    definition: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      default: 'edit'
    }
  },
  data () {
    return {
      config: {
        radios: 'md-radio',
        checkboxes: 'md-check',
        textarea: 'md-textarea-item',
        input: 'md-input-item'
      },
      isShowNext: false,
      rainbowerValue: {}
    }
  },
  computed: {
    componentItems () {
      return this.definition.items.slice(1) || []
    },
    newrainbowerValue () {
      return JSON.parse(JSON.stringify(this.rainbowerValue))
    }
  },
  watch: {
    value (val, oldVal) {
      let status = false
      Object.keys(val).forEach(key => {
        if (val[key] !== oldVal[key]) {
          status = true
        }
      })

      if (status) {
        this.rainbowerValue = { ...val }
      }
    },
    newrainbowerValue: {
      handler (val, oldVal) {
        let status = false
        Object.keys(val).forEach(key => {
          if (val[key] instanceof Array && oldVal[key] instanceof Array) {
            if (val[key].sort().toString() === oldVal[key].sort().toString()) {
              status = false
            } else {
              status = true
            }
          } else if (val[key] !== oldVal[key]) {
            status = true
          }
        })

        if (status) {
          this.$emit('input', val)
        }
      },
      deep: true
    }
  },
  created () {
    this.rainbowerValue = { ...this.value }
  },
  methods: {
    changeChoose (val) {
      const chooseItem = this.definition.options.find(item => item.value === val || val.indexOf(item.value) !== -1)

      if (chooseItem && chooseItem.next) {
        this.isShowNext = true
      } else {
        this.isShowNext = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
