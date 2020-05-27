const _ = require('lodash')

const rule = {
	string: ['select', 'text']
}

function defaultRule (key, schema, options) {
	const def = {
		key,
		...options,
		title: schema.title || key || '',
		required: options.required ? options.required : false
	}

	if (schema.description) {
		def.description = schema.description
	}
	return def
}

function textRule (def, schema) {
	const type = schema.type
	
	if (type === 'string') {
		def.type = 'pps-text'
	}
}

function selectRule(def, schema) {
  const type = schema.type

  if (type === 'string' && schema['enum']) {
    def.type = 'pps-select'
    def.options = enumToOptions(schema['enum'])
  }
}

function enumToOptions(enumArray) {
  const options = []

  _.each(enumArray, item => {
    options.push({
      label: item,
      value: item
    })
	})

  return options
}

const rulesMap = {
	text: textRule,
	select: selectRule
}


class Generator {
	constructor() {
		this.rules = {}
		this.init()
	}

	init () {
    const rules = {}

    _.each(rule, (list, type) => {
      rules[type] = list.map(item => {				
				return rulesMap[item]
			})
		})
		
    this.rules = rules
	}

  parse (formSchema) {
		const definition = []

    if (!(formSchema && formSchema.schema)) {
      throw new Error('formSchema no validate!')
    }

    _.each(formSchema.schema, (schemaItem, key) => {			
      const required = schemaItem.required ? schemaItem.required : _.indexOf(formSchema.required, key) !== -1
console.log(formSchema.value[key]);

      this._parse(key, schemaItem, definition, {
				key,
				value: formSchema.value[key] || '',
        required
      })
		})

    return definition
	}
	
  _parse (key, schemaItem, definition, options) {
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
}

let test = new Generator()

const jsonFormSchema = {
	schema: {
		name: {
			title: 'Default Name',
			description: 'Nickname allowed',
			type: 'string'
		},
		gender: {
			title: 'Gender',
			description: 'Your gender',
			type: 'string',
			enum: [
				'male',
				'female',
				'alien'
			]
		}
	},
	form: [
	'name',
	{
		key: 'gender',
		titleMap: {
			male: 'Dude',
			female: 'Dudette',
			alien: 'I m from outer space!'
		}
	}],
	value: {
		name: 'default name',
		gender: 'female'
	}
}


console.log(test.parse(jsonFormSchema));

// ----------------------------------------------------

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