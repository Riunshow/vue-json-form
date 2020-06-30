import { enumToOptions } from '../../util'

export default function (def, schema) {
  const type = schema.type

  if (type === 'array' && schema['titleMap']) {
    def.type = 'checkboxes'
    def.options = enumToOptions(schema['titleMap'])

    if (def.required && !schema.minItems) {
      schema.minItems = 1
    }
  }
}
