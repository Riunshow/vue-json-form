export default {
  componentName: 'rainbower-address-item',
  isSelect: true,
  isArrow: true,
  getProps ({ title, placeholder, disabled }) {
    return {
      title,
      placeholder,
      disabled
    }
  }
}
