'use strict';

import vue from './vue/index'
import react from './react/index'

function createHtmlDocument({ title, head, body, script }) {
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
${script}
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
  return `<script src="${src}"${type ? " type=\"" + type + '"' : ''}"></script>`
}

function getLibraryUrl(lib) {
  return '  ' + getScriptURL({ src: 'http://unpkg.com/' + lib })
}

const BUILTIN_BOILERPLATES = {
  vue,
  react
}

export function createBoilerplate({ title, lib }) {
  let body = ''
  let head = ''
  let script = ''
  let isSomeBoilerplateAdded = false
  if (lib) {
    lib = Array.isArray(lib) ? lib : [lib]
    for (const item of lib) {
      if (!isSomeBoilerplateAdded && BUILTIN_BOILERPLATES[item]) {
        isSomeBoilerplateAdded = true
        const { style, template } = BUILTIN_BOILERPLATES[item]
        body = addIndent(template, 2)
        head = `<style>\n${addIndent(style, 2)}\n</style>`
      } else {
        body += ('\n' + getLibraryUrl(item))
      }
    }
  }
  body = body || '<div id="app"></div>'
  head = head || '<style></style>'
  if (!isSomeBoilerplateAdded) {
    script = '<script>\n</script>'
  }
  return createHtmlDocument({ title, head, body, script })
}
