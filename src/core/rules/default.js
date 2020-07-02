export default function (schema, options) {
	const def = {
		...options,
		title: schema.title || key || ''
	}

	if (schema.description) {
		def.description = schema.description
	}
	return def
}