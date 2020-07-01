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
  data () {
    return {
      model: {}
    }
  },
  watch: {
    '$store.state': {
      handler (val) {
        this.model = this.getModel(this.formId)
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters([
      'getModel',
      'getFormDefinition'
    ]),
    value: {
      get () {
        switch (this.definition.type) {
          case 'checkboxes':
            return _.get(this.model, this.definition.key) || []
          default:
            return _.get(this.model, this.definition.key)
        }
      },
      set (val) {
        switch (this.definition.type) {
          case 'checkboxes':
            if (val.length === 0) {
              this.removeValue({ formId: this.formId, key: this.definition.key })
            } else {
              this.setValue({ formId: this.formId, key: this.definition.key, value: val })
            }
            break
          default:
            if (val === '') {
              this.removeValue({ formId: this.formId, key: this.definition.key })
            } else {
              this.setValue({ formId: this.formId, key: this.definition.key, value: val })
            }
            break
        }
        this.$emit('input', this.value)
        this.$emit('getFormData', this.getModel(this.formId))
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
  created () {
    this.model = this.getModel(this.formId)
  },
  methods: {
    ...mapMutations([
      'setModel',
      'setValue',
      'removeValue'
    ])
  }
}
