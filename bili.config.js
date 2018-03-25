'use strict'

module.exports = {
  input: 'src/{index,cli}.js',
  filename: '[name].js',
  js: 'babel',
  plugins: [require('rollup-plugin-string')({
    include: [
      'src/boilerplate/**/script.js',
      'src/boilerplate/**/style',
      'src/boilerplate/**/template.html'
    ]
  })]
}
