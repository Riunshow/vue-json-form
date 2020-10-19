export default {
  componentName: 'md-input-item',
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
