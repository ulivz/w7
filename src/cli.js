#!/usr/bin/env node
import cac from 'cac'
import { existsSync } from './util'
import w7 from '.'

const cli = cac()

cli
  .command('*', 'Dev Server', async (input, flags) => {
    const options = {
      input,
      ...flags
    }
    if (options.input.length === 0) {
      delete options.input
    }
    if (options.input && existsSync(options.input[0])) {
      options.entry = options.input[0]
    }
    return w7(options)
  })
  .option('cwd', {
    desc: 'Current working directory.',
    alias: 'c'
  })
  .option('entry', {
    desc: 'Entry html file.',
    alias: 'e'
  })
  .option('port', {
    desc: 'Dev server\'s port [Default: 400]',
    alias: 'p'
  })
  .option('openInBrowser', {
    desc: 'Whether to open browser when server started.',
    alias: 'o'
  })

cli.parse()
