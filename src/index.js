'use strict'

import serveStatic  from 'serve-static'
import connect  from 'connect'
import livereload  from 'connect-livereload'
import lrserver  from 'livereload'
import open  from 'open'
import chalk from 'chalk'
import { exists, resolve }  from './util.js'

export default function ({
                           path,
                           entry,
                           openInBrowser,
                           port
                         }) {

  path = resolve(path || '.')
  const indexFile = resolve(path, entry || 'index.html')

  if (!exists(indexFile)) {
    console.log('\nNo entry file found.\n')
    process.exit(0)
  }

  const server = connect()

  server.use(livereload())
  server.use(serveStatic(path, {
    index: entry
  }))

  server.listen(port || 4000)

  lrserver.createServer({
    exclusions: ['node_modules/']
  }).watch(path)

  if (openInBrowser) {
    open(`http://localhost:${port}`)
  }

  const msg = '\nServing ' + chalk.green(`${path}`) + ' now.\n' +
    'Listening at ' + chalk.green(`http://localhost:${port}`) + '\n'
  console.log(msg)
}
