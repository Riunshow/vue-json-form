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

  _.each(enumArray, item => {
    // todo
    // 这里需要结合 formSchema.form[xxx].titleMap 去找到 value 对应的 label
    options.push({
      label: item,
      value: item
    })
  })

  return options
}

export {
	parseErrors,
	enumToOptions
}