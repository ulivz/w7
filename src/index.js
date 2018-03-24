'use strict'

import serveStatic  from 'serve-static'
import connect  from 'connect'
import livereload  from 'connect-livereload'
import lrserver  from 'livereload'
import open  from 'open'
import chalk from 'chalk'
import { exists, resolve, isAbsolute, relative }  from './util.js'

export default function ({
                           cwd,
                           entry,
                           openInBrowser,
                           port
                         }) {

  cwd = resolve(cwd || '.')
  entry = entry || 'index.html'

  let indexFile
  if (isAbsolute(entry)) {
    indexFile = entry
  } else {
    entry = relative(cwd, entry)
    indexFile = resolve(cwd, entry)
  }

  if (!exists(indexFile)) {
    console.log('\nNo entry file found.\n')
    process.exit(0)
  }

  const server = connect()

  server.use(livereload())
  server.use(serveStatic(cwd, {
    index: entry
  }))

  port = port || 4000

  server.listen(port)

  lrserver.createServer({
    exclusions: ['node_modules/']
  }).watch(cwd)

  if (openInBrowser) {
    open(`http://localhost:${port}`)
  }

  const msg = '\nServing ' + chalk.green(cwd) + ' now.\n' +
    'Listening at ' + chalk.green(`http://localhost:${port}`) + '\n'
  console.log(msg)
}
