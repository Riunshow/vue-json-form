import _ from 'lodash'
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    formId: {
      type: [String, Number],
      default: 0,
      required: true
    },
    definition: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'getModel'
    ]),
    model () {
      return this.getModel(this.formId)
    },
    value: {
      get () {
        return _.get(this.model, this.definition.key)
      },
      set (val) {
        if (val === '') {
          this.removeValue({ formId: this.formId, key: this.key })
        } else {
          this.setValue({ formId: this.formId, key: this.definition.key, value: val })
        }
      }
    },
    name () {
      return this.definition.key
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
