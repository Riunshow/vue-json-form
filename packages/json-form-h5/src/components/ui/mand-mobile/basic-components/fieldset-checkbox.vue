<template>
  <div class="fieldset-checkbox">
    <rainbower-cell-item :title="definition.title">
      <i v-if="mode === 'view' && componentItems.length" slot="right" class="iconfont" v-html="rainbowerValue.checked ? '&#xe6d4;' : '&#xe703;'"></i>
      <md-check v-if="mode === 'edit'" slot="left" class="rainbower-checkbox" v-model="rainbowerValue.checked" size="lg" />
      <template slot="children" v-if="rainbowerValue.checked">
        <div v-for="(item, index) in componentItems" :key="index" >
          <template v-if="mode === 'view'">
            <md-detail-item v-if="item.type === 'input'" :title="item.title">
              <div>{{rainbowerValue[item.key] || '--'}}</div>
            </md-detail-item>

            <component v-else-if="config[item.type].isComponent" :is="config[item.type].componentName" v-model="rainbowerValue[item.key]" mode="view" v-bind="getProps(item)" />

            <md-detail-item v-else :title="item.title">
              <component v-if="rainbowerValue[item.key]" :is="config[item.type].componentName" v-model="rainbowerValue[item.key]" mode="view" v-bind="getProps(item)" />
              <div v-else>--</div>
            </md-detail-item>
          </template>

          <template v-if="mode === 'edit'">
            <validation-provider :name="item.title" :rules="item.required ? 'required' + (config[item.type].isSelect ? ':select' : '') : ''" v-slot="{ errors }">
              <component
                v-if="config[item.type].isComponent"
                :is="config[item.type].componentName"
                v-model="rainbowerValue[item.key]"
                v-bind="getProps(item)"
                :required="item.required"
                :error="errors[0]"
                mode="edit"
              />

              <rainbower-cell-item
                v-else
                :title="item.title"
                :required="item.required"
                :error="errors[0]"
                :arrow="config[item.type].isArrow"
                align="left"
                color="dark">
                <component slot="right" :is="config[item.type].componentName" v-model="rainbowerValue[item.key]" mode="edit" v-bind="getProps(item)" />
                <div v-if="definition.description" slot="children" v-html="definition.description"></div>
              </rainbower-cell-item>
            </validation-provider>
          </template>
        </div>
      </template>
    </rainbower-cell-item>
  </div>
</template>

<script>
import config from '../../../config/index'
import { Check } from 'mand-mobile'
// import TextArea from './text-area'

export default {
  components: {
    [Check.name]: Check
    // [CellItem.name]: CellItem
    // 'text-area': TextArea,
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
      config,
      rainbowerValue: {
        checked: false
      },
      newValue: ''
    }
  },
  watch: {
    value (val, oldVal) {
      // let status = false
      // Object.keys(val).forEach(key => {
      //   if (val[key] !== oldVal[key]) {
      //     status = true
      //   }
      // })

      // if (status) {
      //   this.rainbowerValue = {
      //     checked: false,
      //     ...this.value
      //   }
      // }
      this.rainbowerValue = Object.assign({}, this.rainbowerValue, val)
    },
    rainbowerValue: {
      handler (val, oldVal) {
        // let status = false
        // Object.keys(val).forEach(key => {
        //   if (val[key] !== oldVal[key]) {
        //     status = true
        //   }
        // })

        // if (status) {
        //   this.$emit('input', val)
        // }
        if (JSON.stringify(val) !== this.newValue) {
          this.$emit('input', val)
        }
        this.newValue = JSON.stringify(val)
      },
      deep: true
    }
  },
  computed: {
    componentItems () {
      return this.definition.items || []
    }
  },
  created () {
    this.rainbowerValue = {
      checked: JSON.stringify(this.value) !== '{}',
      ...this.value
    }
  },
  methods: {
    // 组件props
    getProps (data) {
      return {
        ...this.config[data.type].getProps && this.config[data.type].getProps(data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fieldset-checkbox {
  position: relative;
  width: 100%;
  padding-bottom: 8px;
  text-align: left;

  &:after{
    content: "";
    position: absolute;
    bottom: 0;
    left: -16px;
    right: -16px;
    border-bottom: 8px solid #EBEBEB;
  }

  .rainbower-checkbox{
    margin-top: 0;
    margin-bottom: 0;
  }

  ::v-deep .md-cell-item-children{
    padding: 0;
  }
}
</style>
