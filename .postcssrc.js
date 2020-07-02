module.exports = {
  plugins: [
    require('postcss-pxtorem')({
      rootValue: 10,
      minPixelValue: 2,
      propWhiteList: []
    })
  ]
}
