#!/usr/bin/env node

import http from 'http'

import { app } from '../../src/app.js'
import { config } from '../../config/index.js'
import { errorHandler } from '../../src/utils/errorHandler.js'
import { logger } from '../../src/utils/logger.js'

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
      errorHandler.handle(new Error(`${bind} requires elevated privileges`))

      process.exit(1)

    case 'EADDRINUSE':
      errorHandler.handle(new Error(`${bind} is already in use`))

      process.exit(1)

    default:
      throw error
  }
}

/**
 * Event listener for HTTP server 'listening' event.
 */
const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`

  logger.info(`Listening on ${addr.address} ${bind}`)
}

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server')

  server.close(() => {
    logger.info('HTTP server closed')
  })
})

process.on('unhandledRejection', (reason) => {
  throw reason
})

process.on('uncaughtException', error => {
  errorHandler.handle(error)

  setImmediate(() => {
    process.exit(1)
  })
})

// Get port from environment and store in Express.
const port = normalizePort(config.server.port)
const hostname = config.server.hostname

// Create HTTP server.
const server = http.createServer(app)

server.listen(port, hostname)
server.on('error', onError)
server.on('listening', onListening)
