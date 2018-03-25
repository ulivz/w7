'use strict'

import { existsSync, writeFileSync, createWriteStream } from 'fs'
import { resolve, isAbsolute, relative, basename } from 'path'
import { get } from 'http'
import gitConfig from 'git-config'
import gitConfigPath from 'git-config-path'

export {
  existsSync,
  writeFileSync,
  resolve,
  relative,
  isAbsolute
}

export function downloadFile(url, target) {
  target = target || basename(url)
  const targetFile = createWriteStream(target)
  return new Promise((resolve, reject) => {
    get(url, res => {
      res.pipe(targetFile)
        .on('end', resolve)
        .on('error', reject)
    })
  })
}

export function getGitUser() {
  return Object.assign(
    { name: '', email: '' },
    gitConfig.sync(gitConfigPath('global')).user
  )
}
