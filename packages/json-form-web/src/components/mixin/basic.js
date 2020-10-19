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
    },
    mode: {
      type: String,
      default: 'edit'
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
    ...mapGetters('WebJsonFormStore', [
      'getModel',
      'getFormDefinition'
    ]),
    value: {
      get () {
        this.$emit('input', _.get(this.getModel(this.formId), this.definition.key))
        return _.get(this.getModel(this.formId), this.definition.key)
      },
      set (val) {
        this.setValue({ formId: this.formId, key: this.definition.key, value: val })
        this.$emit('refreshFormData', this.getModel(this.formId))
        this.$emit('validateFormField', this.definition.key)
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
    ...mapMutations('WebJsonFormStore', [
      'setModel',
      'setValue',
      'removeValue'
    ])
  }
}
