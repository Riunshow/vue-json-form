import _ from 'lodash'
import extend from 'extend'
import { parseErrors } from '../util/util'
import Ajv from '../validate'
import localize from '../validate/localize'

export const init = (state, { schema, model = {} }) => {
  const generator = state.generator

  state.schema = schema
  state.validator = null
  state.formDefinition = generator.parse(schema)
  const data = generator.getDefaultModal(schema)
  state.model = extend(true, {}, data, model)
  state.ajv = new Ajv()
  state.messages = {}
  state.valid = true
}


