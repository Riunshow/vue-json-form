import { enumToSelectorOptions } from '../../util'

export default function (def) {
	
  if (def.type === 'phone') {
		def.type = 'pps-phone'
		const area = def.items.filter(item => item.key === 'area')
		if (area.length !== 1) {
			throw new Error('phone字段中的area字段有多个')
		}
		def.properties.area.options = enumToSelectorOptions(area[0].titleMap)		
	}
}
