#!/usr/bin/env node
import cac from 'cac'
import w7 from '.'
import { existsSync } from './util'

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
    console.log(options)
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
    alias: 'o'
  })
  .option('openInBrowser', {
    desc: 'Whether to open browser when server started.',
    alias: 'o'
  })

cli.parse()
