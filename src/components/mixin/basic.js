import _ from 'lodash'
import { mapState, mapGetters, mapMutations } from 'vuex'

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
    // model () {
    //   return this.getModel(this.formId)
    // },
    formDefinition () {
      return this.getFormDefinition(this.formId)
    },
    value: {
      get () {
        if (this.definition.type === 'checkboxes') {
          return _.get(this.model, this.definition.key) || []
        } else {
          return _.get(this.model, this.definition.key)
        }
      },
      set (val) {
        if (val === '') {
          this.removeValue({ formId: this.formId, key: this.key })
        } else {
          this.setValue({ formId: this.formId, key: this.definition.key, value: val })
        }
        this.$emit('getFormData', this.formDefinition.model)
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
