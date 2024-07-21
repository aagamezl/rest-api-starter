// import childProcess from 'node:child_process'
// import stream from 'node:stream'
// import { createRequire } from 'node:module'
import { join/* , dirname */ } from 'node:path'
import { mkdirSync } from 'node:fs'
// import { fileURLToPath } from 'url'

import pino from 'pino'
// import pretty from 'pino-pretty'

// import config from '../../config/index.js'

// const require = createRequire(import.meta.url)

// Environment variables
const cwd = process.cwd()
// const { env } = process
const logPath = join(cwd, 'logs')

// Create logs directory
mkdirSync(logPath, { recursive: true })

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

// const pinoTee = pino.transport({
//   target: 'pino-tee',
//   options: {
//     filters: {
//       info: 'info.log',
//       warn: 'warn.log'
//     }
//   }
// })

const transport = pino.transport({
  targets: [
    // {
    //   target: 'pino/file',
    //   options: {
    //     mkdir: true,
    //     // destination: join(__dirname, 'logs/allLogs')
    //     destination: join(logPath, 'all.log')
    //   }
    // },
    {
      target: 'pino/file',
      level: 'error',
      options: {
        mkdir: true,
        // destination: join(__dirname, 'logs/errorLogs')
        destination: join(logPath, 'error.log')
      }
    },
    {
      target: 'pino/file',
      level: 'info',
      options: {
        mkdir: true,
        destination: join(logPath, 'info.log')
      }
    },
    {
      target: 'pino/file',
      level: 'warning',
      options: {
        mkdir: true,
        destination: join(logPath, 'warning.log')
      }
    },
    {
      target: 'pino/file',
      level: 'fatal',
      options: {
        mkdir: true,
        destination: join(logPath, 'fatal.log')
      }
    }
  ]
})

const logger = pino(transport)

// // Create a stream where the logs will be written
// const logThrough = new stream.PassThrough()
// const logger = pino({
//   name: config.application.name,
//   timestamp: pino.stdTimeFunctions.isoTime
// }, logThrough)

// // Log to multiple files using a separate process
// const child = childProcess.spawn(process.execPath, [
//   require.resolve('pino-tee'),
//   'warn', `${logPath}/warn.log`,
//   'info', `${logPath}/info.log`,
//   'error', `${logPath}/error.log`,
//   'fatal', `${logPath}/fatal.log`
// ], { cwd, env })

// logThrough.pipe(child.stdin)

// // Log pretty messages to console (optional, for development purposes only)
// if (!process.env.NODE_ENV || process.env.NODE_ENV === 'DEVELOPMENT') {
//   const prettyStream = pretty()
//   logThrough.pipe(prettyStream)
// }

export default logger
