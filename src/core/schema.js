import _ from 'lodash'

import defaultRule from './rules/default'
import textRule from './rules/text'
import checkboxesRule from './rules/checkboxes'

const rulesMap = {
	checkboxes: checkboxesRule,
	text: textRule
}

const rule = {
	// boolean: ['checkbox'],
	// object: ['fieldset'],
	array: ['checkboxes'],
	// number: ['number'],
	// integer: ['number'],
	// string: ['date', 'image', 'select', 'text']
	string: ['text']
}

class FormSchema {
	constructor() {
		this.rules = {}
		this.init()
	}

	init() {
		const rules = {}

		_.each(rule, (list, type) => {
			rules[type] = list.map((item) => {
				return rulesMap[item]
			})
		})

		this.rules = rules
	}

	/**
	 * 生成表单模型
	 * @param {Object} formSchema
	 */
	parse(formSchema) {
		const definition = []

		if (!(formSchema && formSchema.schema)) {
			throw new Error('formSchema no validate!')
		}

		_.each(formSchema.schema, (schemaItem, key) => {
			const required = schemaItem.required ? schemaItem.required : _.indexOf(formSchema.required, key) !== -1

			this._parse(key, schemaItem, definition, {
				key,
				required
			})
		})

		return definition
	}

	_parse(key, schemaItem, definition, options) {
		const rules = this.rules[schemaItem.type]

		let def

		if (rules) {
			def = defaultRule(key, schemaItem, options)

			for (let i = 0, len = rules.length; i < len; i++) {
				rules[i].call(this, def, schemaItem, options)

				if (def.type) {
					break
				}
			}
		}

		definition.push(def)
	}

	// 从 form schema 中获取 默认值 (value 字段)
	getDefaultModel(formSchema) {
		const model = {}

		_.each(formSchema.schema, (val, key) => {
			model[key] = formSchema.value[key] || ''
		})

		return model
	}

}

export default FormSchema