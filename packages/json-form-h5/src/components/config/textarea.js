export default {
  componentName: 'rainbower-textarea',
  isComponent: true,
  getProps ({ title, placeholder, maxLength, disabled }) {
    return {
      title,
      placeholder,
      maxlength: maxLength,
      disabled
    }
  }
}
