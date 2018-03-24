'use strict'

import fs from 'fs'
export { resolve } from 'path'

export function cwd(path) {
  return resolve(process.cwd(), path || '.')
}

export function pwd(path) {
  return resolve(require('path').dirname(__dirname), path)
}

export function exists(path) {
  if (fs.existsSync(path)) {
    return path
  }
  return undefined
}

export function pkg() {
  return exports.exists(exports.cwd('package.json'))
    ? require(exports.cwd('package.json'))
    : {}
}

export function read(path) {
  return fs.readFileSync(path, 'utf-8').toString()
}
