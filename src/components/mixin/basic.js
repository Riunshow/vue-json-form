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
        this.$emit('input', _.get(this.model, this.definition.key)) 
        return _.get(this.model, this.definition.key)
      },
      set (val) {
        this.setValue({ formId: this.formId, key: this.definition.key, value: val })
        console.log(this.getModel(this.formId));

        this.$emit('input', val)
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
