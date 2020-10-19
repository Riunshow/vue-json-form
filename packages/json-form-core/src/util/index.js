import _ from 'lodash'

// select 多选 转换
const enumToOptions = (enumArray) => {
  const options = []

  _.each(enumArray, (label, value) => {
    options.push({
      label,
      value
    })
  })

  return options
}

// select 转换
const enumToSelectorOptions = (enumArray) => {
  const options = []

  _.each(enumArray, (text, value) => {
    options.push({
      text,
      value
    })
  })

  return options
}

export {
  enumToOptions,
  enumToSelectorOptions
}

export default {
  enumToOptions,
  enumToSelectorOptions
}
