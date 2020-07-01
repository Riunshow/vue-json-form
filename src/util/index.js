import _ from 'lodash'

// select 下拉选项转换
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

export {
	enumToOptions
}