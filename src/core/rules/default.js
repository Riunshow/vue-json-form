export default function (schema, formItem, options) {
	const def = {
		...schema,
		...options
	}

	if (formItem.items) {
		def.items = formItem.items
	}

	return def
}