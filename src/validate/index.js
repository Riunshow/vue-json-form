import Ajv from 'ajv'
import ajvErrors from 'ajv-errors'
import defaults from './config'

export default function (options = {}) {
  const config = { ...defaults, ...options }
  const ajv = new Ajv(config)
  ajvErrors(ajv)

  return ajv
}
