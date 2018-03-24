#!/usr/bin/env node
import cac from 'cac'
import chalk from 'chalk'
import { existsSync, writeFileSync } from './util'
import w7 from '.'
import { createBoilerplate } from './boilerplate/index'

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
    desc: 'Dev server\'s port [Default: 4000]',
    alias: 'p'
  })
  .option('openInBrowser', {
    desc: 'Whether to open browser when server started.',
    alias: 'o'
  })

cli.command('init', 'Create boilerplate', async (input, flags) => {
  if (flags.lib) {
    flags.lib = flags.lib.split(',').map(i => i.trim())
  }
  if (input.length) {
    flags.lib = (flags.lib || []).concat(input)
  }
  flags.title = flags.name || ((flags.lib[0] || 'My') + ' App')
  const html = createBoilerplate(flags)
  const filename = flags.title.replace(/\s/g, '-').toLowerCase() + '.html'
  writeFileSync(filename, html, 'utf-8')

  const msg = '\n  > Generating ' + chalk.green(filename) + '.\n' +
    '  > Hack with ' + chalk.green(`w7 ${filename}`) + ' now.\n'
  console.log(msg)
})
  .option('lib', {
    desc: 'Preset library name.',
    alias: 'l'
  })
  .option('name', {
    desc: 'Generated file\'s name.',
    alias: 'n'
  })

cli.parse()
