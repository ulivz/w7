#!/usr/bin/env node
import cac from 'cac'
import chalk from 'chalk'
import superb from 'superb'
import { existsSync, writeFileSync, getGitUser } from './util'
import { devServer, boilerplate } from '.'

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
    return devServer(options)
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
  let { lib, name } = flags
  lib = lib || ''

  if (input.length > 0) {
    for (let i = 0, l = input.length; i < l; i++) {
      lib += ((lib ? ',' : '') + input[i])
    }
  }

  if (lib) {
    lib = lib.split(',').map(i => i.trim())
  }

  const user = getGitUser()
  const title = name || (lib ? lib.join(' ') : user.name + ' ' + superb() + ' app')

  const html = boilerplate.createBoilerplate({ title, lib })
  const filename = title.trim().replace(/(\s|,)/g, '-').toLowerCase() + '.html'

  writeFileSync(filename, html, 'utf-8')
  const msg = '\n  > Generated ' + chalk.green(filename) + '.\n' +
    '  > Go hacking with ' + chalk.green(`w7 ${filename}`) + '.\n'
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
