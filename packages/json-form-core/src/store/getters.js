export const getDefinition = (state) => (formId) => {
  return state[`formDefinition${formId}`].formDefinition
}

export const getModel = (state) => (formId) => {
  return state[`formDefinition${formId}`].model
}

export const getFormDefinition = (state) => (formId) => {
  return state[`formDefinition${formId}`]
}
