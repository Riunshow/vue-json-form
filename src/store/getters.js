import { getSchemaByKey } from '../util'

export const getSchema = (state) => (key) => {
  return getSchemaByKey(state.formSchema.schema, key)
}
