export default {
  componentName: 'rainbower-upload-form',
  isComponent: true,
  isSelect: true,
  getProps ({ title, description, maxLength }) {
    return {
      title,
      description,
      maxlength: maxLength
    }
  }
}
