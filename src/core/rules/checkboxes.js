import { enumToOptions } from '../../util'

export default function (def, schema) {
  if (def.type = 'checkboxes') {
    def.options = enumToOptions(schema['titleMap'])
  }
}
