defaultRule (key, schema, options) {
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