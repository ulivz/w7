#!/usr/bin/env node
import cac from 'cac'
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
    console.log(options)
    return w7(options)
  })

cli.parse()
