import { enumToOptions } from '../util'

export default {
  componentName: 'rainbower-phone',
  getProps ({ title, placeholder, titleMap }) {
    return {
      title,
      placeholder,
      options: enumToOptions(titleMap)
    }
  }
}
