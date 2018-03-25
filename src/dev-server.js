'use strict'

import serveStatic from 'serve-static'
import connect from 'connect'
import livereload from 'connect-livereload'
import lrserver from 'livereload'
import open from 'open'
import chalk from 'chalk'
import { existsSync, resolve, isAbsolute, relative } from './util'

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

  if (!existsSync(indexFile)) {
    console.log('\n  > No entry file found.\n')
    /* eslint-disable unicorn/no-process-exit */
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

  const msg = '\n  > Serving ' + chalk.green(cwd) + ' now.\n' +
    '  > Listening at ' + chalk.green(`http://localhost:${port}`) + '\n'
  console.log(msg)
}
