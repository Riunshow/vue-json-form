export default function (def, schema) {
  if (def.type === 'input') {
    def.type = 'v-text'
  }
}
