'use strict';

import vue from './boilerplate/vue/index'
import react from './boilerplate/react/index'
import rxjs from './boilerplate/rxjs/index'
import vueJsx from './boilerplate/vue-jsx/index'

const BUILTIN_BOILERPLATES = {
  vue,
  react,
  rxjs,
  'vue-jsx': vueJsx
}

function createHtmlDocument({ title, head, body }) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>${title}</title>
${head}
</head>
<body>
${body}
</body>
</html>
`
}

function addIndent(content, spaces = 2) {
  let indent = ''
  while (spaces > 0) {
    indent += ' '
    spaces--
  }
  return content.split('\n').map(line => indent + line).join('\n')
}

function getScriptURL({ src, type }) {
  return `<script src="${src}"${type ? " type=\"" + type + '"' : ''}></script>`
}

function getLibraryUrl(lib) {
  return getScriptURL({ src: 'http://unpkg.com/' + lib }) + '\n'
}


export function createBoilerplate({ title, lib }) {
  let body = ''
  let head = ''
  let isSomeBoilerplateAdded = false
  if (lib) {
    lib = Array.isArray(lib) ? lib : [lib]
    for (const item of lib) {
      if (!isSomeBoilerplateAdded && BUILTIN_BOILERPLATES[item]) {
        isSomeBoilerplateAdded = true
        const { style, template } = BUILTIN_BOILERPLATES[item]
        body += template
        if (style) {
          head += `<style>\n${addIndent(style, 2)}\n</style>`
        }
      } else {
        body += getLibraryUrl(item)
      }
    }
  }
  head = head || '<style></style>'
  if (!isSomeBoilerplateAdded) {
    body = '  <div id="app"></div>' + body
    body = body + '\n<script>\n</script>'
  }
  head = addIndent(head, 2)
  body = addIndent(body, 2)
  return createHtmlDocument({ title, head, body })
}
