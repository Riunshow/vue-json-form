import _ from 'lodash'

// 通过 字段key 找到当前 schema
const getSchemaByKey = function (schema = {}, key = '') {
	if (!schema) {
		throw new Error('schema is required!')
	}

	if (!key) {
		return schema
	}

	const schemaPath = [key]

	return _.get(schema, schemaPath)
}

const parseErrors = function (errors) {
  const map = {}

  errors.forEach(err => {
    map[err.path] = err
  })

  return map
}

// select 下拉选项转换
const enumToOptions = function (enumArray) {
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
	getSchemaByKey,
	parseErrors,
	enumToOptions
}