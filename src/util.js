'use strict'

import { existsSync, readFileSync } from 'fs'
import { resolve, isAbsolute, relative } from 'path'

export {
  existsSync,
  resolve,
  relative,
  isAbsolute
}

export function cwd(path) {
  return resolve(process.cwd(), path || '.')
}

export function pwd(path) {
  return resolve(require('path').dirname(__dirname), path)
}

export function exists(path) {
  if (existsSync(path)) {
    return path
  }
  return undefined
}

export function pkg() {
  return exists(cwd('package.json'))
    ? require(cwd('package.json'))
    : {}
}

export function read(path) {
  return readFileSync(path, 'utf-8').toString()
}
