<template>
  <form class="form-horizontal" @submit.prevent>
    <form-item
      v-for="(item, index) in formDefinition"
      :definition="item"
      :key="`${group.key ? group.key.join('.') : ''}-${index}`" 
    />
    <slot />
  </form>
</template>

<script>
import { mapState } from 'vuex'
import FormItem from './form-item'

export default {
  components: {
    FormItem
  },
  computed: mapState({
    formDefinition: state => state.formDefinition
  })
}
</script>
