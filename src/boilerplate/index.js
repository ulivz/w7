'use strict';

import vue from './vue/index'

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
  <script>
${script}
  </script>
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

function getLibraryUrl(lib) {
  return `  <script src="http://unpkg.com/${lib}"></script>`
}

const BUILTIN_BOILERPLATES = {
  vue
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
        const { js, css, html } = BUILTIN_BOILERPLATES[item]
        body = addIndent(html, 2)
        head = `<style>\n${addIndent(css, 2)}\n</style>`
        script = addIndent(js, 4)
      }
      body += ('\n' + getLibraryUrl(item))
    }
  }
  body = body || '<div id="app"></div>'
  head = head || '<style></style>'
  return createHtmlDocument({ title, head, body, script })
}
