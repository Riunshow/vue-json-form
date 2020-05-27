import _ from 'lodash'

const rule = {
	boolean: ['checkbox'],
	object: ['fieldset'],
	array: ['checkboxes'],
	number: ['number'],
	integer: ['number'],
	string: ['date', 'image', 'select', 'text']
}

class FormSchema {
	constructor () {
    this.rules = {}
    this.init()
	}
	
  /**
   * 生成表单模型
   * @param {Object} FormSchema
   */
  parse (FormSchema) {
		/*
		{
			'schema': {},
			'form': [],
			'value': { key: val }
		}
		*/
    if (!(FormSchema && FormSchema.schema && FormSchema.form)) {
      throw new Error('form schema no validate!')
		}

		return FormSchema
  }

}