import _ from 'lodash'

const parseErrors = (errors) => {
  const map = {}

  errors.forEach(err => {
    map[err.path] = err
  })

  return map
}

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
	parseErrors,
	enumToOptions
}