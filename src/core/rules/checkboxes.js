import { enumToOptions } from '../../util'

export default function (def) {
  if (def.type = 'checkboxes') {
    def.options = enumToOptions(def['titleMap'])
  }
}
