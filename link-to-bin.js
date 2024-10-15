#!/usr/bin/env node

import * as os from 'node:os'
import * as fs from 'node:fs'
import * as n_path from 'node:path'
const log = console.log

const args = process.argv
if (args.length != 3) {
  console.log('Invalid number of arguments.')
  process.exit()
}

const filePath = args[2]
const fileName = n_path.basename(filePath)
const fileNameWithoutExt = n_path.basename(filePath, n_path.extname(filePath))
const localBinDir = `${os.homedir()}/.local/bin` // as in user local
const asLocalBinPath = `${localBinDir}/${fileNameWithoutExt}`

try {
  doTheThing()
} catch (error) {
  log(`Something went wrong: ${error}`)
}

function doTheThing() {
  if (!isDirectoryInPath(localBinDir)) {
    log(`PATH is missing "${localBinDir}", please add it to PATH first!`)
    return
  }
  const lstat = fs.lstatSync(filePath)
  if (lstat.isFile()) {
    if (fs.existsSync(asLocalBinPath)) {
      log(`Already symlinked, undoing the link.`)
      fs.rmSync(asLocalBinPath) // delete link
      return
    }
    try {
      fs.accessSync(filePath, fs.constants.X_OK)
    } catch (error) {
      log(`${fileName} is not executable, fixing that for you (0o755)!`)
      fs.chmodSync(filePath, 0o755) // https://nodejs.org/api/fs.html#fs_fs_chmod_path_mode_callback
    }
    fs.mkdirSync(localBinDir, {recursive: true}) // ensure the bin directory
    fs.linkSync(filePath, asLocalBinPath) // create link
    log(`Symlink created at: ${asLocalBinPath}`)
  } else {
    log(`Hey, that's not a file: ${filePath}`)
  }
}

function isDirectoryInPath(dir) {
  return (process.env.PATH || '').split(n_path.delimiter).includes(dir)
}
