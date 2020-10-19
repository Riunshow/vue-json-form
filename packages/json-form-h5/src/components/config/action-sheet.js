import { enumToOptions } from '../util'

export default {
  componentName: 'rainbower-action-sheet',
  isSelect: true,
  isArrow: true,
  getProps ({ title, placeholder, titleMap }) {
    return {
      title,
      placeholder,
      options: enumToOptions(titleMap)
    }
  }
}
