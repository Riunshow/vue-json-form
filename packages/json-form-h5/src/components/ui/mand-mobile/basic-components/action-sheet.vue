<template>
  <div>
    <div @click="$_showActionSheet">{{definition.titleMap[value] || definition.placeholder}}</div>
    <md-action-sheet
      v-model="show"
      :title="definition.title"
      :cancel-text="cancelText"
      :options="options"
      @selected="$_selected"
      @cancel="$_cancel"
    ></md-action-sheet>
  </div>
</template>

<script>
import basicMixin from '../../../mixin/basic'
import { ActionSheet } from 'mand-mobile'

export default {
  name: 'action-sheet-demo',

  components: {
    [ActionSheet.name]: ActionSheet
  },

  mixins: [basicMixin],

  data () {
    return {
      show: false,
      cancelText: '取消'
    }
  },

  computed: {
    options () {
      return this.definition.enum.map(item => {
        return {
          label: this.definition.titleMap[item],
          value: item
        }
      })
    }
  },

  methods: {
    $_showActionSheet () {
      this.show = true
    },

    $_selected (item) {
      this.value = item.value
    },

    $_cancel () {
      console.log('action-sheet cancel')
    }
  },

  mounted () {
    console.log(this.definition)
  }
}
</script>
