const _ = require('lodash')
const objectpath = require('objectpath')

const rule = {
	boolean: ['checkbox'],
	object: ['fieldset'],
	array: ['checkboxes', 'array'],
	number: ['number'],
	integer: ['number'],
	string: ['date', 'image', 'select', 'text']
}


class Generator {
	constructor() {
		this.rules = rule
	}

	/**
	 * 生成表单模型
	 * @param {Object} schema 
	 * @param {Array} definition 
	 */
	parse(schema, definition = []) {
		if (!(schema && schema.properties)) {
			throw new Error('schema no validate!')
		}

		const options = {
			path: [],
			lookup: {}
		}
		const schemaForm = []

		_.each(schema.properties, (val, key) => {
			this._parse(key, val, schemaForm, {
				path: [key],
				lookup: options.lookup
			})
		})

		definition = schemaForm

		return definition
	}

	/**
	 * 生成表单模型
	 * @param {Object} schema 
	 * @param {Array} definition 
	 */
	_parse(name, schema, definition, options) {
		const rules = this.rules[schema.type]
		let def

		if (rules) {
			def = this.defaultRule(name, schema, options)
		}

		definition.push(def)
	}

	defaultRule(name, schema, options) {
		const def = {
			key: options.path
		}

		def.title = typeof schema.title !== 'undefined' ? schema.title : name

		if (schema.description) {
			def.description = schema.description
		}

		if (options.required) {
			def.required = true
		}

		if (options.col) {
			def.col = options.col
		}

		// def.schema = schema
		console.log(options.path, options.path,objectpath.stringify(options.path));
		
		options.lookup[objectpath.stringify(options.path)] = def

		return def
	}
}

let test = new Generator()

const schema = {
	title: 'basic',
	type: 'object',
	properties: {
		name: {
			type: 'string',
			title: '姓名'
		},
		phone: {
			type: 'string',
			title: '手机',
			pattern: '^1[3578]\\d{9}$',
			description: '请输入正确的手机号码'
		},
		single: {
			type: 'boolean',
			title: '是否单身',
			format: "cancelTip"
		}
	},
	required: ['name', 'phone', 'single']
}

test.parse(schema)