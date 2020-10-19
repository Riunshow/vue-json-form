import { enumToOptions } from '../util'

export default {
  componentName: 'rainbower-picker',
  isSelect: true,
  isArrow: true,
  getProps ({ title, placeholder, titleMap, dictKey }) {
    return {
      title,
      placeholder,
      data: titleMap ? [enumToOptions(titleMap)] : null,
      dictKey
    }
  }
}
