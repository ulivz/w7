'use strict';

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
  <script>
  
  </script>
</body>
</html>
`
}

function getLibraryUrl(lib) {
  return `  <script src="http://unpkg.com/${lib}"></script>`
}

export function createBoilerplate({ title, lib }) {
  let body = '<div id="app"></div>'
  let head = '<style></style>'
  if (lib) {
    lib = Array.isArray(lib) ? lib : [lib]
    body += ('\n' + lib.map(item => getLibraryUrl(item)).join('\n'))
  }
  return createHtmlDocument({ title, head, body })
}
