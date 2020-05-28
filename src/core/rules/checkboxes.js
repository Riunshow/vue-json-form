import { enumToOptions } from '../../util'

export default function (def, schema) {
  const type = schema.type

  if (type === 'array' && schema.items && schema.items['enum']) {
    def.type = 'checkboxes'
    def.options = enumToOptions(schema.items['enum'])

    if (def.required && !schema.minItems) {
      schema.minItems = 1
    }
  }
}
