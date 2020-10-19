import _ from 'lodash'

export default function (formItem, schemaItem, options) {
  formItem = {
    ...schemaItem,
    ...formItem,
    fieldType: schemaItem.type,
    required: schemaItem.required || formItem.required || false
  }

  const newItems = []

  // 对象字段映射
  _.each(formItem.items, item => {
    if (formItem.properties[item.key]) {
      item = {
        ...formItem.properties[item.key],
        ...item,
        fieldType: formItem.properties[item.key].type
      }
      newItems.push(item)
    }
  })

  formItem.items = [...newItems]

  const def = {
    ...formItem,
    ...options
  }

  if (formItem.items) {
    def.items = formItem.items
  }

  return def
}
