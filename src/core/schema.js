import _ from 'lodash'

import defaultRule from './rules/default'
import inputRule from './rules/input'
import checkboxesRule from './rules/checkboxes'

const rulesMap = {
	input: inputRule,
	checkboxes: checkboxesRule
}

class FormSchema {
	constructor() {
	}

	/**
	 * 生成表单模型
	 * @param {Object} formSchema
	 */
	parse (formSchema) {
		const definition = []

		if (!(formSchema && formSchema.schema)) {
			throw new Error('formSchema或formSchema.schema不存在')
		}

		_.each(formSchema.schema, (schemaItem, key) => {
			const formItem = formSchema.form.filter(formItem => formItem.key === key)[0]

			if (formItem.length > 1) {
				throw new Error('表单出现重复key')
			}

			// 是否必填
			const required = formItem.required || false

			// 是否有枚举
			if (schemaItem.enum) {
				if (schemaItem.enum.length !== Object.keys(formItem.titleMap).length) {
					throw new Error('[schema中的enum]与[form中的titleMap]的length不匹配')
				}
				schemaItem.titleMap = formItem.titleMap
			}

			this._parse(schemaItem, formItem, definition, {
				key,
				required,
				type: formItem.type
			})
		})

		return definition
	}

	_parse (schemaItem, formItem, definition, options) {
		const rules = rulesMap[formItem.type]
		const def = defaultRule(schemaItem, options)

		definition.push(def)

		if (rules) {
			rules.call(this, def, schemaItem)
		}
	}

	// 从 form schema 中获取 默认值 (value 字段)
	getDefaultModel (formSchema) {
		const model = {}

		_.each(formSchema.schema, (val, key) => {
			model[key] = formSchema.value[key] ? formSchema.value[key] : val.type === 'array' ? [] : ''
		})

		return model
	}

}

export default FormSchema