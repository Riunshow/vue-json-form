<template>
	<div>

	</div>
</template>

<script>
import basicMixin from '../../../mixin/basic'

import { InputItem } from 'mand-mobile'

export default {
  components: {
    [InputItem.name]: InputItem
  },
	mixins: [basicMixin],
	created () {
		console.log(this.definition)
	}
}
</script>