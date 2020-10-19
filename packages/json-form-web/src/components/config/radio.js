import { util } from '@rainbower/json-form-core'

export default {
  componentName: 'df-radios',
  isComponent: true,
  getProps (def) {
    def.options = util.enumToOptions(def['titleMap'])
    return def
  }
}
