import childProcess from 'node:child_process'
import stream from 'node:stream'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import { mkdirSync } from 'node:fs'

import pino from 'pino'

const require = createRequire(import.meta.url)

// Environment variables
const cwd = process.cwd()
const { env } = process
const logPath = join(cwd, 'logs')

// Create logs directory
mkdirSync(logPath, { recursive: true })

// Create a stream where the logs will be written
const logThrough = new stream.PassThrough()
export const logger = pino({ name: 'project' }, logThrough)

// Log to multiple files using a separate process
const child = childProcess.spawn(process.execPath, [
  require.resolve('pino-tee'),
  'warn', `${logPath}/warn.log`,
  'info', `${logPath}/info.log`,
  'error', `${logPath}/error.log`,
  'fatal', `${logPath}/fatal.log`
], { cwd, env, stdio: ['pipe', 'inherit', 'inherit'] })

logThrough.pipe(child.stdin)
