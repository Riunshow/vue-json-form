import _ from 'lodash'
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    definition: {
      type: Object,
      required: true
    },
    key: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState({
      model: state => state.model
    }),
    value: {
      get () {
        return _.get(this.model, this.key)
      },
      set (val) {
        if (val === '') {
          this.removeValue(this.key)
        } else {
          this.setValue({ key: this.key, value: val})
        }
      }
    },
    name () {
      return this.key.join('.')
    },
    type () {
      return this.definition.type
    },
    required () {
      return this.definition.required
    }
  },
  methods: {
    ...mapMutations([
      'setValue',
      'removeValue'
    ])
  }
}
