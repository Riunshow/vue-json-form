import { enumToOptions } from '../../util'

export default function (def, schema) {
  const type = schema.type

  if (type === 'string' && schema['enum']) {
    def.type = 'pps-select'
    def.options = enumToOptions(schema['enum'])
  }
}
