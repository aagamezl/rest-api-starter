#!/usr/bin/env node

import app from '../../src/app.js'
import config from '../../config/index.js'
import { loggerHandler } from '../../src/utils/index.js'

/**
 * Normalize a port into a number, string, or undefined.
 *
 * @param {*} value
 * @return {*}
 */
const normalizePort = (value) => {
  const port = parseInt(value, 10)

  if (isNaN(port)) {
    // named pipe
    return value
  }

  if (port >= 0) {
    // port number
    return port
  }

  return undefined
}

/**
 * Event listener for HTTP server 'error' event.
 *
 * @param {NodeJS.ErrnoException} error
 */
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      loggerHandler.error(new Error(`${bind} requires elevated privileges`))

      process.exit(1)

      break
    case 'EADDRINUSE':
      loggerHandler.error(new Error(`${bind} is already in use`))

      process.exit(1)

      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server 'listening' event.
 */
const onListening = (error, address) => {
  if (error) {
    onError(error)
  }

  loggerHandler.info(`Listening on ${address}`)
}

// Graceful shutdown
process.on('SIGTERM', () => {
  loggerHandler.error(new Error('SIGTERM signal received: closing HTTP server'))

  app.close(() => {
    loggerHandler.info('HTTP server closed')

    process.exit(0)
  })
})

process.on('unhandledRejection', (reason) => {
  throw reason
})

process.on('uncaughtException', (error) => {
  loggerHandler.error(error)

  setImmediate(() => {
    process.exit(1)
  })
})

// Get port from environment and store in Express.
const port = normalizePort(config.server.port)
const host = config.server.hostname

app.listen({ port, host }, onListening)
